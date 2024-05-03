import { describe, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { expect } from "chai";
import { ScoringDummy } from "../src/BoardScoring";
import { doubleLineClear, lineClear } from "./utils";

describe("Board Scoring", () => {
  test("adds 1 point when a line is cleared", () => {
    const boardScoring = new ScoringDummy();

    lineClear(boardScoring);

    expect(boardScoring.value).to.equal(1);
  });

  test("adds 2 points when 2 lines are cleared at the same time", () => {
    const boardScoring = new ScoringDummy();

    doubleLineClear(boardScoring);

    expect(boardScoring.value).to.equal(2);
  });

  test("sums up 3 points after 2 different line clear, a double and a simple one", () => {
    const boardScoring = new ScoringDummy();

    doubleLineClear(boardScoring);
    lineClear(boardScoring);

    expect(boardScoring.value).to.equal(3);
  });

  test("adds two points when 1 line is cleared on level 1", () => {
    const boardScoring = new ScoringDummy();

    lineClear(boardScoring, 1);

    expect(boardScoring.value).to.equal(2);
  });
});
