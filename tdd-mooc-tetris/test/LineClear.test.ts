import { describe, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { expect } from "chai";

describe("Line clear", () => {
  test("single is done if a horizontal line is filled", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       .........
       XXXX.XXXX
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
       ...TTT...
       XXXX.XXXX`
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

  test("double is done if two horizontal lines are filled", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       ......XXX
       XXXX.XXXX
       XXXX.XXXX`
    );

    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `.........
       .........
       .........
       .........
       ....I....
       ....I.XXX`
    );
  });

  test("triple is done if three horizontal lines are filled", () => {
    const board = Board.loadBoard(
      `.........
       .........
       ......XXX
       XXXX.XXXX
       XXXX.XXXX
       XXXX.XXXX`
    );

    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `.........
       .........
       .........
       .........
       .........
       ....I.XXX`
    );
  });

  test("quadruple (tetris) is done if four horizontal lines are filled", () => {
    const board = Board.loadBoard(
      `.........
       ......XXX
       XXXX.XXXX
       XXXX.XXXX
       XXXX.XXXX
       XXXX.XXXX`
    );

    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `.........
       .........
       .........
       .........
       .........
       ......XXX`
    );
  });
});
