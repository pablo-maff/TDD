import { Observer } from "./EventsManager";

export class LevelsFixedGoal implements Observer {
  #level: number;
  #clearedLines: number = 0;

  constructor(initialLevel: number = 0) {
    this.#level = initialLevel;
  }

  update(data: Record<string, number>): void {
    this.#clearedLines += data.clearedLines;
    this.#increaseLevel();
  }

  #increaseLevel(): void {
    const newLevel = Math.floor(this.#clearedLines / 10);

    if (this.#level < newLevel) {
      this.#level = newLevel;
    }
  }

  get value(): number {
    return this.#level;
  }
}
