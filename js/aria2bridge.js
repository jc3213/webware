const aria2Bridge = (function() {
    let index = 0;

    const calls = {};
    
    window.addEventListener('message', (evnet) => {
        let { aria2c, id, result } = event.data
        if (aria2c === 'aria2c_response') {
            calls[id]?.(result);
            delete calls[id];
        }
    });

    return {
        call(aria2c, params) {
            return new Promise((resolve, reject) => {
                let id = index++;
                let timer = setTimeout(() => {
                    delete this[id];
                    reject(new Error('"Download With Aria2" is either not installed, disabled, or outdated (must be higher than v4.16.4.3450).'));
                }, 3000);
                calls[id] = function(result) {
                    clearTimeout(timer);
                    resolve(result);
                };
                window.postMessage({ aria2c, id, params });
            });
        },
        status() {
            return this.call('aria2c_status');
        },
        download(params) {
            return this.call('aria2c_download', params);
        }
    };
})();
