import { Observer } from "../../src/EventsManager";

export class LevelDummy implements Observer {
  #level: number;

  constructor(initialLevel: number = 0) {
    this.#level = initialLevel;
  }

  update(data: Record<string, number>): void {
    this.#level += data.clearedLines;
  }

  get value(): number {
    return this.#level;
  }
}
