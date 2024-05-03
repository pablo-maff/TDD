import { Observer } from "./Observer";

export class LevelsFixedGoal implements Observer {
  #level: number;
  #clearedLines: number = 0;

  constructor(initialLevel: number = 0) {
    this.#level = initialLevel;
  }

  update(data: Record<string, number>) {
    this.#clearedLines += data.clearedLines;
    this.#level = Math.floor(this.#clearedLines / 10);
  }

  public get value(): number {
    return this.#level;
  }
}
