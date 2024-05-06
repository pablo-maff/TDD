import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringDummy } from "./Doubles/ScoringDummy.js";
import { doubleLineClear, lineClear } from "./utils.js";

describe("Board Scoring", () => {
  let scoringSystem: ScoringDummy;

  beforeEach(() => {
    scoringSystem = new ScoringDummy();
  });

  test("adds 1 point when a line is cleared", () => {
    lineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(1);
  });

  test("adds 2 points when 2 lines are cleared at the same time", () => {
    doubleLineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(2);
  });

  test("sums up 3 points after 2 different line clear, a double and a simple one", () => {
    doubleLineClear(scoringSystem);
    lineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(3);
  });

  test("adds two points when 1 line is cleared on level 1", () => {
    lineClear(scoringSystem, 1);

    expect(scoringSystem.value).to.equal(2);
  });
});
