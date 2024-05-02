import { Observer } from "./Observer";

export class NintendoScoring implements Observer {
  #state: number = 0;

  #ScorePerLinesCleared: Record<number, number> = Object.freeze({
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
  });

  update(linesCleared: number): void {
    this.#state = this.#ScorePerLinesCleared[linesCleared];
  }

  public get value(): number {
    return this.#state;
  }
}
