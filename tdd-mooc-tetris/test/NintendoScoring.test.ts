import { beforeEach, describe, test } from "vitest";
import { NintendoScoring } from "../src/NintendoScoring.js";
import { expect } from "chai";
import { doubleLineClear, lineClear, quadrupleLineClear, tripleLineClear } from "./utils.js";

describe("Nintento Scoring system", () => {
  let scoringSystem: NintendoScoring;

  beforeEach(() => {
    scoringSystem = new NintendoScoring();
  });

  test("starts with 0 points", () => {
    expect(scoringSystem.value).to.equal(0);
  });

  test("adds 40 points if 1 line is cleared", () => {
    lineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(40);
  });

  test("adds 100 points when 2 lines are cleared at the same time", () => {
    doubleLineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(100);
  });

  test("adds 300 points when 3 lines are cleared at the same time", () => {
    tripleLineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(300);
  });

  test("adds 1200 points when 4 lines are cleared at the same time", () => {
    quadrupleLineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(1200);
  });

  test("sums up 140 points after 2 different line clear, a double and a simple one", () => {
    doubleLineClear(scoringSystem);
    lineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(140);
  });

  test("adds 80 points when 1 line is cleared on level 1", () => {
    lineClear(scoringSystem, 1);

    expect(scoringSystem.value).to.equal(80);
  });
});
