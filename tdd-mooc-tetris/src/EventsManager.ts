export interface Observer {
  update(data: Record<string, number>): void;
  value: number;
}
export interface Subject {
  subscribe(observer: Observer): void;

  unsubscribe(eventType: string): void;

  notify(data: Record<string, number>): void;
}

export class EventsManager implements Subject {
  #observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.#observers = [...this.#observers, observer];
  }

  unsubscribe(): void {
    this.#observers = this.#observers.slice(0, -1);
  }

  notify(data: Record<string, number>): void {
    this.#observers.forEach((observer) => observer.update(data));
  }
}
