import { Observer } from "./Observer";

export class NintendoScoring implements Observer {
  #state: number = 0;

  update(linesCleared: number): void {
    this.#state = 40;
  }

  public get value(): number {
    return this.#state;
  }
}
