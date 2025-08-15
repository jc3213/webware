class Aria2Bridge {
    constructor () {
        if (Aria2Bridge.#opened) {
            throw new SyntaxError('Only one Aria2Bridge instance is allowed!');
        }
        Aria2Bridge.#opened = true;
        window.addEventListener('message', (evnet) => {
            let { aria2c, id, result } = event.data
            if (aria2c === 'aria2c_response') {
                this[id]?.(result);
                delete this[id];
            }
        });
    }
    call (aria2c, params) {
        return new Promise((resolve, reject) => {
            let id = crypto.randomUUID();
            let timer = setTimeout(() => {
                delete this[id];
                reject(new Error('"Download With Aria2" is either not installed, disabled, or outdated (must be higher than v4.16.4.3450).'));
            }, 3000);
            this[id] = (result) => {
                clearTimeout(timer);
                resolve(result);
            };
            window.postMessage({ aria2c, id, params });
        });
    }
    static #opened = false;
}
