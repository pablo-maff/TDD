import { describe, test } from "vitest";
import { EventsManager } from "../src/EventsManager.js";
import { expect } from "chai";
import { DummyObserver } from "./Doubles/DummyObserver.js";

describe("Events Manager", () => {
  test("can notify an observer when an event happens", () => {
    const events = new EventsManager();
    const observer = new DummyObserver();

    events.subscribe(observer);
    events.notify({ value: 4 });

    expect(observer.value).to.equal(5);
  });

  test("can notify 2 observers when an event happens", () => {
    const events = new EventsManager();
    const observer1 = new DummyObserver();
    const observer2 = new DummyObserver();

    events.subscribe(observer1);
    events.subscribe(observer2);

    events.notify({ value: 4 });

    expect(observer1.value).to.equal(5);
    expect(observer2.value).to.equal(5);
  });
});
