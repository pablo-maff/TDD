import { Observer } from "./EventsManager";

export class ShuffleBag implements Observer {
  #items: string[] = [];

  update(data: Record<string, number>): void {
    return; // TODO: trigger shuffling on update
  }

  set add(items: string[]) {
    this.#items = items;
  }

  get items() {
    return this.#items;
  }
}
