import { describe, test } from "vitest";
import { Board } from "../src/Board.js";
import { Tetromino } from "../src/Tetromino.js";
import { expect } from "chai";

describe("Line clear", () => {
  test("single", () => {
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

  test("double", () => {
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

  test("triple", () => {
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

  test("quadruple (tetris)", () => {
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

  test("can complete a hurdle", () => {
    const board = Board.loadBoard(
      `.........
       .........
       ......XXX
       XXXX.XXXX
       XXXX.XX.X
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
       ....I.XXX
       XXXXIXX.X`
    );
  });
});
