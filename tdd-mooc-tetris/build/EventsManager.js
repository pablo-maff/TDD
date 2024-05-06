export class EventsManager {
  #observers = [];
  subscribe(observer) {
    this.#observers = [...this.#observers, observer];
  }
  unsubscribe() {
    this.#observers = this.#observers.slice(0, -1);
  }
  notify(data) {
    this.#observers.forEach((observer) => observer.update(data));
  }
}
