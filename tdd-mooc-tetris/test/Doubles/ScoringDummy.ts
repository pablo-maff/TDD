import { Observer } from "../../src/EventsManager";

export class ScoringDummy implements Observer {
  #score: number = 0;

  update(data: Record<string, number>) {
    this.#score += data.clearedLines * (data.level + 1);
  }

  get value() {
    return this.#score;
  }
}
