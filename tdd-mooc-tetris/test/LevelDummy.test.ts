import { describe, test } from "vitest";
import { expect } from "chai";
import { LevelDummy } from "../src/LevelDummy";
import { doubleLineClear, lineClear } from "./utils";

describe("Board Levels", () => {
  test("start at 0", () => {
    const level = new LevelDummy();

    expect(level.value).to.equal(0);
  });

  test("can be set to 5", () => {
    const level = new LevelDummy(5);

    expect(level.value).to.equal(5);
  });

  test("reaches level 1 after a line is cleared", () => {
    const level = new LevelDummy();

    lineClear(level);

    expect(level.value).to.equal(1);
  });

  test("reaches level 2 after two lines are cleared", () => {
    const level = new LevelDummy();

    doubleLineClear(level);

    expect(level.value).to.equal(2);
  });
});
