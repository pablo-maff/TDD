import { expect } from "chai";
import { describe, test } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";

describe("Shuffle bag", () => {
  test("can add 1 item", () => {
    const bag = new ShuffleBag();

    bag.add = ["X"];

    expect(bag.items[0]).to.equal("X");
  });
});
