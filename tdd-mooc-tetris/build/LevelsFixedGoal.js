export class LevelsFixedGoal {
  #level;
  #clearedLines = 0;
  constructor(initialLevel = 0) {
    this.#level = initialLevel;
  }
  update(data) {
    this.#clearedLines += data.clearedLines;
    this.#increaseLevel();
  }
  #increaseLevel() {
    const newLevel = Math.floor(this.#clearedLines / 10);
    if (this.#level < newLevel) {
      this.#level = newLevel;
    }
  }
  get value() {
    return this.#level;
  }
}
