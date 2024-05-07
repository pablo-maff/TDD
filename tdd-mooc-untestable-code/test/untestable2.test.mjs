import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  const die1 = 1;
  const die2 = 2;

  test("diceHandValue returns high die", () => {
    expect(diceHandValue(die1, die2)).to.equal(2);
  });

  test("diceHandValue returns high die", () => {
    const die1 = 3;

    expect(diceHandValue(die1, die2)).to.equal(3);
  });

  test("diceHandValue returns one pair", () => {
    const die2 = 1;

    expect(diceHandValue(die1, die2)).to.equal(101);
  });

  test("diceRoll always returns a number equal or greater than 1", () => {
    let remainingRuns = 10000;

    while (remainingRuns > 0) {
      const die = diceRoll();
      expect(die).to.be.greaterThanOrEqual(1);
      --remainingRuns;
    }
  })

  test("diceRoll always returns a number equal or smaller than 6", () => {
    let remainingRuns = 10000;

    while (remainingRuns > 0) {
      const die = diceRoll();
      expect(die).to.be.lessThanOrEqual(6);
      --remainingRuns;
    }
  })
});
