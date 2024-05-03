export interface Observer {
  update(data: Record<string, number>): void;
  value: number;
}

export class DummyObserver implements Observer {
  #state: number = 0;

  update(data: Record<string, number>) {
    this.#state = data.value + 1;
  }

  public get value(): number {
    return this.#state;
  }
}
