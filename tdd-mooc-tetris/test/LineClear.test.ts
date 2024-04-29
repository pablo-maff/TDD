import { describe, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { expect } from "chai";

describe("Line clear", () => {
  test("is done if a horizontal line is filled", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       .........
       .........
       XXXX.XXXX`
    );

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `.........
       .........
       .........
       .........
       .........
       ...TTT...`
    );
  });

  test("is not done if a block is falling", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       .........
       .........
       XXXX.XXXX`
    );

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(board.hasFalling());
    expect(board.toString()).to.equalShape(
      `.........
       .........
       .........
       .........
       ...TTT...
       XXXXTXXXX`
    );
  });
});
