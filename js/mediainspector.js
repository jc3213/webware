const MediaInspector = (function () {
    const extraAttributes = new Map([
        ['title', 'title'],
        ['lang', 'lang'],
        ['dir', 'dir'],
        ['id', 'id'],
        ['class', 'className']
    ]);

    function getAttributes(el) {
        const map = new Map();

        for (const { name, value } of el.attributes) {
            map.set(name, value);
        }

        for (const [key, prop] of extraAttributes) {
            map.set(key, el[prop]);
        }

        return map;
    }

    function getChanges(before, after) {
        const changes = new Map();

        for (const [key, afterValue] of after) {
            const beforeValue = before.get(key);
            if (beforeValue !== afterValue) {
                changes.set(key, afterValue);
            }
        }

        for (const key of before.keys()) {
            if (!after.has(key)) {
                changes.set(key, undefined);
            }
        }

        return changes;
    }

    return function (callback) {
        const proto = HTMLMediaElement.prototype;

        if (proto.__mediaInspected_) {
            throw new SyntaxError('MediaInspector has already been applied to HTMLMediaElement.prototype.src');
        }

        proto.__mediaInspected_ = true;

        const descriptor = Object.getOwnPropertyDescriptor(proto, 'src');
        if (!descriptor || !descriptor.set || !descriptor.get) return;

        Object.defineProperty(proto, 'src', {
            configurable: true,
            enumerable: true,
            get() {
                return descriptor.get.call(this);
            },
            set(value) {
                const before = getAttributes(this);
                descriptor.set.call(this, value);
                requestAnimationFrame(() => {
                    const after = getAttributes(this);
                    const changes = getChanges(before, after);
                    console.log(before, after);
                    callback(this, changes);
                });
            }
        });
    };
})();
