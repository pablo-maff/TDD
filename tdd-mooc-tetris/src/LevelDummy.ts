import { Observer } from "./Observer";

export class LevelDummy implements Observer {
  #level: number = 0;

  update(data: Record<string, number>) {
    this.#level += data.clearedLines;
  }

  public get value(): number {
    return this.#level;
  }
}
