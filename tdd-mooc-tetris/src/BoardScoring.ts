import { Observer } from "./Observer";

export class BoardScoring implements Observer {
  #score: number = 0;

  update(data: Record<string, number>) {
    this.#score += data.clearedLines * (data.level + 1);
  }

  public get value() {
    return this.#score;
  }
}
