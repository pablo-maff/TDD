import { Observer } from "./EventsManager";

export class NintendoScoring implements Observer {
  #score: number = 0;

  #ScorePerLinesCleared: Record<number, number> = Object.freeze({
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
  });

  update(data: Record<string, number>): void {
    this.#score += this.#ScorePerLinesCleared[data.clearedLines] * (data.level + 1);
  }

  get value(): number {
    return this.#score;
  }
}
