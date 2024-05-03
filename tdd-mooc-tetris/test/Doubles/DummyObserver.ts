import { Observer } from "../../src/EventsManager";

export class DummyObserver implements Observer {
  #state: number = 0;

  update(data: Record<string, number>) {
    this.#state = data.value + 1;
  }

  get value(): number {
    return this.#state;
  }
}
