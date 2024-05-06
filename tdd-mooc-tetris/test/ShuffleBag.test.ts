import { ShuffleBag } from "../src/ShuffleBag.js";
import { Block } from "./Doubles/Block.js";
import { getRandomInt } from "../src/utils.js";

function randomChars(amount: number): Block[] {
  const chars: Block[] = [];

  while (amount > 0) {
    chars.push(new Block(String.fromCharCode(getRandomInt(0, 65535))));
    --amount;
  }

  return chars;
}

describe("Shuffle bag", () => {
  let item: Block;

  beforeEach(() => {
    item = new Block(String.fromCharCode(getRandomInt(0, 65535)));
  });

  test("can not create an empty bag", () => {
    expect(() => new ShuffleBag([])).to.throw("items must contain at least one item");
  });

  test("can add 1 item and return it", () => {
    const bag = new ShuffleBag([item]);

    expect(bag.items[0].toString()).to.equal(item.toString());
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

    expect(nextItem!.toString()).to.equal(item.toString());
  });

  test("can extract multiple items", () => {
    let numRuns = 100;

    do {
      const nItems = getRandomInt(1, 100);
      const items = randomChars(nItems);

      const bag = new ShuffleBag(items);

      let remainingExtractions = nItems;

      while (remainingExtractions > 0) {
        const nextTetromino = bag.next();

        expect(items.map((item) => item.toString())).to.include(nextTetromino!.toString());
        --remainingExtractions;
      }

      --numRuns;
    } while (numRuns > 0);
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

      expect(items.map((item) => item.toString())).to.include(itemFromRefilledBag!.toString());

      --numRuns;
    } while (numRuns > 0);
  });
});
