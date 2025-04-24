class Gacha {
    constructor() {
        this.reset();
    }
    #rarity = {
        up: 0.014,
        sr: 0.3,
        ssr: 0.03
    };
    #pools = {
        r: [],
        sr: [],
        ssr: [],
        up: []
    }
    #max = 200;
    set max (number) {
        this.#rarity.max = isNaN(number) || number < 1 ? 1 :number > 200 ? 200 : number;
    }
    get max () {
        return this.#rarity.max;
    }
    set rarity (rarity) {
        if (!rarity.up || !rarity.sr || !rarity.ssr) { throw new Error('parameter 1 "' + JSON.stringify(rarity) + '" is invalid; must be an object of {up: float, ssr: float, sr: flost}.'); }
        this.#rarity = rarity;
    }
    get rarity () {
        return this.#rarity;
    }
    reset () {
        this.#rarity.cur = 0;
        this.cards = { up: [], ssr: [], sr: [], r: [] };
    }
    pool (type, number) {
        let pool = this.#pools[type];
        if (!pool) { throw new Error('parameter 1 "' + type + '" is invalid; must be "r", "sr", "ssr", or "up".'); };
        if (!Number.isInteger(number) || number < 1) { throw new Error('parameter 2 "' + number + '" is invalid; must be a positive number larger than 0.'); }
        Array.from({ length: number }, (_, i) => pool.push(type + i));
    }
    card (type) {
        let pool = this.#pools[type];
        let card = pool[Math.floor(Math.random() * pool.length)];
        this.cards[type].push(card);
        console.log('Got "' + type.toUpperCase() + '" card: ' + card);
    }
    roll (number) {
        if (!Number.isInteger(number) || number < 1) { throw new Error('parameter 1 "' + number + '" is invalid; must be a positive number larger than 0.'); }
        if (this.#rarity.cur === this.#rarity.max) {
            return;
        }
        for (let i = 0; i < number; i ++) {
            let random = Math.random();
            if (random < this.#rarity.up) {
                this.card('up');
            } else if (random < this.#rarity.ssr) {
                this.card('ssr');
            } else if (random < this.#rarity.sr) {
                this.card('sr');
            } else {
                this.card('r');
            }
            if (++ this.#rarity.cur === this.#rarity.max) {
                this.result();
                break;
            }
        }
    }
    result() {
        let { up, ssr, sr, r } = this.cards;
        console.log('Gacha max at "' + this.#rarity.max + '" rolls;\n' +
            'Got ' + up.length + ' pickup cards: "'+ up.join(', ') + '";\n' +
            'Got ' + r.length + ' R cards: "' + r.join(', ') + '";\n' +
            'Got ' + sr.length + ' SR cards: "' + sr.join(', ') + '";\n' +
            'Got ' + ssr.length + ' SSR cards: "' + ssr.join(', ') + '";');
    }
}

/* Run test
let a = new Gacha();
a.pool('r', 80);
a.pool('sr', 30);
a.pool('ssr', 10);
a.pool('up', 1);
a.roll(200);
*/
