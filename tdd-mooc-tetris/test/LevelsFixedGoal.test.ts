import { beforeEach, describe, test } from "vitest";
import { Observer } from "../src/Observer";
import { LevelsFixedGoal } from "../src/LevelsFixedGoal";
import { expect } from "chai";
import { lineClear } from "./utils";

function clearLines(amount: number, observer: Observer) {
  let remainingClears = amount;

  while (remainingClears > 0) {
    lineClear(observer);
    --remainingClears;
  }
}

describe("Levels Fixed Goal", () => {
  let level: Observer;

  beforeEach(() => {
    level = new LevelsFixedGoal();
  });

  test("start at 0", () => {
    expect(level.value).to.equal(0);
  });

  test("can be set to 5", () => {
    const level = new LevelsFixedGoal(5);

    expect(level.value).to.equal(5);
  });

  test("reaches level 1 after 10 lines are cleared", () => {
    clearLines(10, level);

    expect(level.value).to.equal(1);
  });

  test("is still in level 1 after 15 lines are cleared", () => {
    clearLines(15, level);

    expect(level.value).to.equal(1);
  });

  test("is in level 2 after 20 lines are cleared", () => {
    clearLines(20, level);

    expect(level.value).to.equal(2);
  });

  test("is in level 15 after 157 lines are cleared", () => {
    clearLines(157, level);

    expect(level.value).to.equal(15);
  });

  test("when starting from level 5 it doesn't level up after 10 lines are cleared", () => {
    const level = new LevelsFixedGoal(5);

    clearLines(10, level);

    expect(level.value).to.equal(5);
  });
});
