import { describe, test } from "vitest";
import { EventsManager } from "../src/EventManager";
import { DummyObserver } from "../src/Observer";
import { expect } from "chai";

describe("Events Manager", () => {
  test("can notify an observer when an event happens", () => {
    const events = new EventsManager();
    const observer = new DummyObserver();

    events.subscribe(observer);

    expect(events.notify(4)).to.equal(5);
  });
});
