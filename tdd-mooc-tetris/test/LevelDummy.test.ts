import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { LevelDummy } from "../src/LevelDummy";
import { doubleLineClear, lineClear } from "./utils";
import { Observer } from "../src/Observer";

describe("Board Levels", () => {
  let level: Observer;

  beforeEach(() => {
    level = new LevelDummy();
  });

  test("start at 0", () => {
    expect(level.value).to.equal(0);
  });

  test("can be set to 5", () => {
    const level = new LevelDummy(5);

    expect(level.value).to.equal(5);
  });

  test("reaches level 1 after a line is cleared", () => {
    lineClear(level);

    expect(level.value).to.equal(1);
  });

  test("reaches level 2 after two lines are cleared", () => {
    doubleLineClear(level);

    expect(level.value).to.equal(2);
  });
});
