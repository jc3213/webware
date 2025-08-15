function PromiseTimeout(n) {
    return new Promise((resolve, reject) => {
        Number.isFinite(n) && n > 0 
            ? setTimeout(resolve, n * 1000)
            : reject(new TypeError("parameter 1 must be a non-negative number!"));
    });
}
