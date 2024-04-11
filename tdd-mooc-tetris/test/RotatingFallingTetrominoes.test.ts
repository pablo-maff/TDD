import { expect } from "chai";
import { Board } from "../src/Board.js";
import { Tetromino } from "../src/Tetromino.js";
import { fallToBottom, moveRight } from "./utils.js";
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

    expect(board.hasFalling(), "the player should not be able to move the block").to.be.false;
  });

  test("cannot be rotated left when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.rotateRight();
    board.tick();
    board.tick();
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     ..........
     ....TT....
     ...TTTT...
     ....TT....`
    );
  });

  test("cannot be rotated right when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.rotateRight();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     ..........
     ....TT....
     ...TTTT...
     ....TT....`
    );
  });

  test("can do a wall kick rotating right if there is room to rotate on the left side of the wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     TTT.......
     .T........
     ..........
     ..........`
    );
  });

  test("can do a wall kick rotating left if there is room to rotate on the right side of the wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateLeft();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     .......TTT
     ........T.
     ..........
     ..........`
    );
  });
});
