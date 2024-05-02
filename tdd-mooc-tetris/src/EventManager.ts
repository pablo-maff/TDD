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
  #observer: Observer | null = null;

  subscribe(observer: Observer): void {
    this.#observer = observer;
  }

  unsubscribe(): void {
    this.#observer = null;
  }

  notify(data: any): void {
    if (!this.#observer) {
      throw new Error("observer is not defined");
    }

    return this.#observer.update(data);
  }
}
