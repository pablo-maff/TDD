import { expect } from "chai";
import { describe, test } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";
import { getRandomInt } from "./utils";

describe("Shuffle bag", () => {
  const item = "X";

  test("is created with 0 items in it", () => {
    const bag = new ShuffleBag();

    expect(bag.items.length).to.equal(0);
  });

  test("can add 1 item and return it", () => {
    const bag = new ShuffleBag();

    bag.add([item]);

    expect(bag.items[0]).to.equal(item);
  });

  test("can add multiple items", () => {
    const bag = new ShuffleBag();

    let numRuns = 100;

    do {
      const nItems = getRandomInt(1000);
      const items = new Array(nItems).fill(item);

      bag.add(items);

      expect(bag.items.length).to.equal(nItems);

      --numRuns;
    } while (numRuns > 0);
  });

  test("can remove an item", () => {
    const bag = new ShuffleBag();

    bag.add([item]);
    bag.remove();

    expect(bag.items.length).to.equal(0);
  });

  test("can't remove an item from an empty bag", () => {
    const bag = new ShuffleBag();

    expect(() => bag.remove()).to.throw("empty bag");
  });

  test("can shuffle an empty bag", () => {
    const bag = new ShuffleBag();

    expect(() => bag.shuffle()).to.not.throw();
  });

  test("shuffle does not lose items", () => {
    const bag = new ShuffleBag();

    let numRuns = 100;

    do {
      const nItems = getRandomInt(1000);
      const items = new Array(nItems).fill(item);

      bag.add(items);
      bag.shuffle();

      expect(bag.items.length).to.equal(nItems);

      --numRuns;
    } while (numRuns > 0);
  });
});
