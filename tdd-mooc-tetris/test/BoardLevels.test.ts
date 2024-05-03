import { describe, test } from "vitest";
import { Board } from "../src/Board";
import { expect } from "chai";

describe("Board Levels", () => {
  test("start at 0", () => {
    const board = new Board(3, 3);

    expect(board.level).to.equal(0);
  });

  test("can be set to 5", () => {
    const board = new Board(3, 3);

    board.level = 5;

    expect(board.level).to.equal(5);
  });
});
