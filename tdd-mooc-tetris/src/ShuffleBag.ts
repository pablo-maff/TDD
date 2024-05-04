import { Observer } from "./EventsManager";

export class ShuffleBag implements Observer {
  #items: string[] = [];

  update(data: Record<string, number>): void {
    return; // TODO: trigger shuffling on update
  }

  add(items: string[]) {
    this.#items = items;
  }

  remove() {
    if (!this.#items.length) {
      throw new Error("empty bag");
    }

    this.#items = this.#items.slice(0, -1);
  }

  shuffle() {}

  get items() {
    return this.#items;
  }
}
