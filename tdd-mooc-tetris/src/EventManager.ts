import { Observer } from "./Observer";

export interface Subject {
  // * Attach an observer to the subject.
  subscribe(observer: Observer): void;

  // * Detach an observer from the subject.
  unsubscribe(eventType: string): void;

  // * Notify all observers about an event.
  notify(data: any): void;
}

export class EventsManager implements Subject {
  #observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.#observers = [...this.#observers, observer];
  }

  unsubscribe(): void {
    this.#observers = this.#observers.slice(0, -1);
  }

  notify(data: any): void {
    if (!this.#observers) {
      throw new Error("observer is not defined");
    }

    this.#observers.forEach((observer) => observer.update(data));
  }
}
