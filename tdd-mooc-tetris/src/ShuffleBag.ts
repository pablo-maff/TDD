import { isMovableShape, Shape } from "./shapes.js";
import { getRandomInt } from "./utils.js";

export class ShuffleBag {
  #bag: Shape[] = [];
  #tempBag: Shape[] = [];

  constructor(items: Shape[]) {
    if (!items.length) {
      throw new Error("items must contain at least one item");
    }

    this.#add(items);
    this.#shuffle();
  }

  next(): Shape {
    if (!this.size) {
      this.#tempBag = [...this.#bag];

      this.#shuffle();
    }

    const nextItem = this.#tempBag.pop();

    if (!isMovableShape(nextItem)) {
      throw new Error("Error: next item is not a MovableShape or it doesn't exist");
    }

    return nextItem;
  }

  #add(items: Shape[]) {
    for (let i = 0; i < items.length; i++) {
      this.#bag.push(items[i]);
      this.#tempBag.push(items[i]);
    }
  }

  #shuffle() {
    if (this.size > 1) {
      for (let i = this.size - 1; i > 0; i--) {
        const j: number = getRandomInt(1, i);
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
