export interface Observer {
  // * Receive update from subject.
  update(data: number): void;
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
