export interface Observer {
  update(data: number): void;
  value: number;
}

export class DummyObserver implements Observer {
  #state: number = 0;

  update(data: number) {
    this.#state = data + 1;
  }

  public get value(): number {
    return this.#state;
  }
}
