import { Observer } from "./Observer";

export class BoardScoring implements Observer {
  #score: number = 0;

  update(linesCleared: number) {
    this.#score += linesCleared;
  }

  public get value() {
    return this.#score;
  }
}
