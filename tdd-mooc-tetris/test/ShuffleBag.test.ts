import { expect } from "chai";
import { beforeEach, describe, test } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";
import { getRandomInt } from "./utils";

function randomChars(amount: number): string[] {
  const chars = [];

  while (amount > 0) {
    chars.push(String.fromCharCode(getRandomInt(65535)));
    --amount;
  }

  return chars;
}

describe("Shuffle bag", () => {
  let bag: ShuffleBag;
  let item: string;

  beforeEach(() => {
    bag = new ShuffleBag();
    item = String.fromCharCode(getRandomInt(65535));
  });

  test("is created with 0 items in it", () => {
    expect(bag.size).to.equal(0);
  });

  test("can add 1 item and return it", () => {
    bag.add([item]);

    expect(bag.size).to.equal(1);
  });

  test("can add multiple items", () => {
    let numRuns = 100;

    do {
      const bag = new ShuffleBag();

      const nItems = getRandomInt(1000);
      const items = randomChars(nItems);

      bag.add(items);

      expect(bag.size).to.equal(nItems);

      --numRuns;
    } while (numRuns > 0);
  });

  test("can remove an item", () => {
    bag.add([item]);
    bag.remove();

    expect(bag.size).to.equal(0);
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
      const bag = new ShuffleBag();

      const nItems = getRandomInt(100);
      const items = randomChars(nItems);

      bag.add(items);
      bag.shuffle();

      expect(bag.size).to.equal(nItems);

      --numRuns;
    } while (numRuns > 0);
  });

  test("shuffle changes order of items", () => {
    let numRuns = 100;

    do {
      const nItems = getRandomInt(100);
      const items = randomChars(nItems);

      bag.add(items);
      bag.shuffle();

      expect(bag.items).to.not.deep.equal(items);

      --numRuns;
    } while (numRuns > 0);
  });
});
