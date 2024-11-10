import { Observer } from "./EventsManager.js";

export class LevelsFixedGoal implements Observer {
  #level: number;
  #clearedLines: number = 0;

  constructor(initialLevel: number = 0) {
    this.#level = initialLevel;
  }

  update(data: Record<string, number>): void {
    this.#clearedLines += data.clearedLines;
    this.#calculateLevel();
  }

  #calculateLevel(): void {
    const newLevel = Math.floor(this.#clearedLines / 10);

    if (this.#level < newLevel) {
      this.#level = newLevel;
    }
  }

  get value(): number {
    return this.#level;
  }
}
