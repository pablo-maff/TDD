import { getRandomInt } from "../test/utils";
import { Observer } from "./EventsManager";

export class ShuffleBag implements Observer {
  #items: string[] = [];
  // #currentItem: Shape;
  #currentPosition: number = -1;

  update(data: Record<string, number>): void {
    return; // TODO: trigger shuffling on update
  }

  add(items: string[]) {
    for (let i = 0; i < items.length; i++) {
      this.#items.push(items[i]);
    }
  }

  remove() {
    if (!this.#items.length) {
      throw new Error("empty bag");
    }

    this.#items = this.#items.slice(0, -1);
  }

  shuffle() {
    if (this.size > 1) {
      for (let i = this.size - 1; i > 0; i--) {
        // const j: number = getRandomInt(i + 1)
        const j = Math.floor(Math.random() * (i + 1));
        [this.#items[i], this.#items[j]] = [this.#items[j], this.#items[i]];
      }
    }
  }

  get items() {
    return this.#items;
  }

  get size() {
    return this.#items.length;
  }
}
