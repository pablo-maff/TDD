export interface Observer {
  // * Receive update from subject.
  update(data: any): void;
}

export class DummyObserver implements Observer {
  update(data: number) {
    return data + 1;
  }
}
