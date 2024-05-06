import { getRandomInt } from "./utils.js";
export class ShuffleBag {
    #bag = [];
    #tempBag = [];
    constructor(items) {
        if (!items.length) {
            throw new Error("items must contain at least one item");
        }
        this.#add(items);
        this.#shuffle();
    }
    next() {
        if (!this.size) {
            this.#tempBag = [...this.#bag];
            this.#shuffle();
        }
        return this.#tempBag.pop();
    }
    #add(items) {
        for (let i = 0; i < items.length; i++) {
            this.#bag.push(items[i]);
            this.#tempBag.push(items[i]);
        }
    }
    #shuffle() {
        if (this.size > 1) {
            for (let i = this.size - 1; i > 0; i--) {
                const j = getRandomInt(1, i);
                [this.#tempBag[i], this.#tempBag[j]] = [this.#tempBag[j], this.#tempBag[i]];
            }
        }
    }
    get items() {
        return this.#tempBag;
    }
    get size() {
        return this.#tempBag.length;
    }
}
