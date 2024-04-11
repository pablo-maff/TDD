import { expect } from "chai";
import { Board } from "../src/Board.js";
import { Tetromino } from "../src/Tetromino.js";
import { fallToBottom } from "./utils.js";
import { beforeEach, describe, test } from "vitest";

describe("Rotating Falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated right more than once", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated left more than once", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be rotated if it has stopped falling", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });
});
