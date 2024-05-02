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

      case 3:
        this.#state = 300;
        break;

      case 4:
        this.#state = 1200;
        break;

      default:
        break;
    }
  }

  public get value(): number {
    return this.#state;
  }
}
