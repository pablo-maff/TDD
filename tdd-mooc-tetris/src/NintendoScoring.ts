import { Observer } from "./Observer";

export class NintendoScoring implements Observer {
  #state: number = 0;

  update(data: number): void {
    return;
  }

  public get value(): number {
    return this.#state;
  }
}
