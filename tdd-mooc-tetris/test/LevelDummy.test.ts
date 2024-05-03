import { describe, test } from "vitest";
import { Board } from "../src/Board";
import { expect } from "chai";
import { LevelDummy } from "../src/LevelDummy";

describe("Board Levels", () => {
  test("start at 0", () => {
    const board = new Board(3, 3);

    expect(board.level).to.equal(0);
  });

  test("can be set to 5", () => {
    const board = new Board(3, 3, undefined, 5);

    expect(board.level).to.equal(5);
  });

  test("increase after a line is cleared", () => {
    const board = new Board(3, 3);
    const level = new LevelDummy();

    expect(level.value).to.equal(0);
  });
});
