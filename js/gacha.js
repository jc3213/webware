class Gacha {
    version = '0.1';
    #cur = 0;
    reset () {
        this.#cur = 0;
        this.#cards.clear();
    }
    empty () {
        this.reset();
        this.#rarity.clear();
        this.#pools.clear();
    }
    #cards = new Map();
    get cards() {
        return { rolls: this.#cur, cards: this.#cards };
    }
    #max = 200;
    set max(value) {
        if (Number.isFinite(value) && value % 10 !== 0) {
            throw new Error(`parameter 1 "${value}" must be a multiple of 10 or Infinity`);
        }
        this.#max = value;
    }
    get max() {
        return this.#max;
    }
    #pools = new Map();
    #rarity = new Map();
    pool (type, rare, args) {
        if (!/^(up|ur|ssr|sr|r)$/.test(type)) {
            throw new Error(`parameter 1 "${type}" must be one of r, sr, ssr, ur, up`);
        }
        if (!/^0\.([0-4]\d*|5)$/.test(rare)) {
            throw new Error(`parameter 2: "${value}" must be a float number less than 0.5`);
        }
        if (!Array.isArray(args) || args.length === 0) {
            throw new Error(`parameter 3 "${args}" must be a non-empty 'Array'`);
        }
        let pool = new Map();
        args.forEach((e, i) => pool.set(i, e));
        this.#pools.set(type, pool);
        this.#rarity.set(type, rare);
    }
    get pools() {
        let result = [...this.#pools].map((pool, type) => {
            let rarity = this.#rarity.get(type);
            return {type, rarity, pool};
        });
        return result;
    }
    #pick (type) {
        let pool = this.#pools.get(type);
        if (!pool || pool.size === 0) {
            throw new Error(`Gacha pool "${type.toUpperCase()}" is empty!`);
        }
        let pick = pool.get(Math.floor(Math.random() * pool.size));
        let card = this.#cards.get(type) ?? new Map();
        let tick = (card.get(pick) ?? 0) + 1;
        card.set(pick, tick);
        this.#cards.set(type, card);
        console.log(`Got ${type.toUpperCase()} card: ${pick}`);
    }
    roll (value) {
        if (!Number.isInteger(value) || value < 1) {
            throw new Error(`parameter 1 "${value}" must be a positive number larger than 0`);
        }
        if (this.#cur >= this.#max) {
            return;
        }
        let up = this.#rarity.get('up') ?? 0;
        let ur = this.#rarity.get('ur') ?? 0;
        let ssr = this.#rarity.get('ssr') ?? 0;
        let sr = this.#rarity.get('sr') ?? 0;
        let r = this.#rarity.get('r') ?? 1;
        for (let i = 0; i < value; i++) {
            this.#cur++;
            let random = Math.random();
            if (random < up) {
                this.#pick('up');
            } else if (random < ur) {
                this.#pick('ur');
            } else if (random < ssr) {
                this.#pick('ssr');
            } else if (random < sr) {
                this.#pick('sr');
            } else {
                this.#pick('r');
            }
            if (this.#cur >= this.#max) {
                break;
            }
        }
    }
}
