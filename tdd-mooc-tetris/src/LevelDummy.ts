import { Observer } from "./Observer";

export class LevelDummy implements Observer {
  #level: number;

  constructor(initialLevel: number = 0) {
    this.#level = initialLevel;
  }

  update(data: Record<string, number>) {
    this.#level += data.clearedLines;
  }

  public get value(): number {
    return this.#level;
  }
}
