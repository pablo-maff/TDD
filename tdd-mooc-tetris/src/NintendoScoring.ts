import { Observer } from "./Observer";

export class NintendoScoring implements Observer {
  #state: number = 0;

  update(linesCleared: number): void {
    switch (linesCleared) {
      case 1:
        this.#state = 40;
        break;

      case 2:
        this.#state = 100;
        break;

      default:
        break;
    }
  }

  public get value(): number {
    return this.#state;
  }
}
