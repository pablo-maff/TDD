import { expect } from "chai";
import { beforeEach, describe, test } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";
import { getRandomInt } from "./utils";

describe("Shuffle bag", () => {
  let bag: ShuffleBag;
  let item: string;

  beforeEach(() => {
    bag = new ShuffleBag();
    item = String.fromCharCode(getRandomInt(65535));
  });

  test("is created with 0 items in it", () => {
    expect(bag.items.length).to.equal(0);
  });

  test("can add 1 item and return it", () => {
    bag.add([item]);

    expect(bag.items[0]).to.equal(item);
  });

  test("can add multiple items", () => {
    let numRuns = 100;

    do {
      const item = String.fromCharCode(getRandomInt(65535));
      const nItems = getRandomInt(1000);
      const items = new Array(nItems).fill(item);

      bag.add(items);

      expect(bag.items.length).to.equal(nItems);

      --numRuns;
    } while (numRuns > 0);
  });

  test("can remove an item", () => {
    bag.add([item]);
    bag.remove();

    expect(bag.items.length).to.equal(0);
  });

  test("can't remove an item from an empty bag", () => {
    expect(() => bag.remove()).to.throw("empty bag");
  });

  test("can shuffle an empty bag", () => {
    expect(() => bag.shuffle()).to.not.throw();
  });

  test("shuffle does not lose items", () => {
    let numRuns = 100;

    do {
      const item = String.fromCharCode(getRandomInt(65535));
      const nItems = getRandomInt(1000);
      const items = new Array(nItems).fill(item);

      bag.add(items);
      bag.shuffle();

      expect(bag.items.length).to.equal(nItems);

      --numRuns;
    } while (numRuns > 0);
  });

  test.skip("shuffle changes order of items", () => {});
});
