import { expect } from "chai";
import { beforeEach, describe, test } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";
import { getRandomInt } from "./utils";

function randomChars(amount: number): string[] {
  const chars = [];

  while (amount > 0) {
    chars.push(String.fromCharCode(getRandomInt(0, 65535)));
    --amount;
  }

  return chars;
}

describe("Shuffle bag", () => {
  let item: string;

  beforeEach(() => {
    item = String.fromCharCode(getRandomInt(0, 65535));
  });

  test("can not create an empty bag", () => {
    expect(() => new ShuffleBag([])).to.throw("items must contain at least one item");
  });

  test("can add 1 item and return it", () => {
    const bag = new ShuffleBag([item]);

    expect(bag.items[0]).to.equal(item);
  });

  test("can add multiple items", () => {
    let numRuns = 100;

    do {
      const nItems = getRandomInt(1, 1000);
      const items = randomChars(nItems);

      const bag = new ShuffleBag(items);

      expect(bag.size).to.equal(nItems);

      --numRuns;
    } while (numRuns > 0);
  });

  test("can extract an item", () => {
    const bag = new ShuffleBag([item]);

    const nextItem = bag.next();

    expect(nextItem).to.equal(item);
  });

  test("the bag refills after is emptied and returns another item", () => {
    let numRuns = 100;

    do {
      const nItems = getRandomInt(1, 1000);
      const items = randomChars(nItems);

      const bag = new ShuffleBag(items);

      let remainingExtractions = nItems;

      while (remainingExtractions > 0) {
        bag.next();
        --remainingExtractions;
      }

      const itemFromRefilledBag = bag.next();

      expect(items).to.include(itemFromRefilledBag);

      --numRuns;
    } while (numRuns > 0);
  });
});
