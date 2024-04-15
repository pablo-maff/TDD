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
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
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
     .......TT.
     .....TTTTT
     ....TTTTT.`
    );
  });

  test("cannot be rotated right when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotateRight();
    board.tick();
    board.tick();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     ..........
     .......TT.
     .....TTTTT
     ....TTTTT.`
    );
  });

  test("can wall kick rotating right on the left side of the wall", () => {
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

  test("can wall kick rotating left on the right side of the wall", () => {
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

  test("can wall kick rotating left if against another block", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    board.tick();
    board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.rotateRight();
    board.tick();
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     ....I.T...
     ....ITTT..
     ....I.....
     ....I.....`
    );
  });

  test("can wall kick rotating left if against another block", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.tick();
    board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotateRight();
    board.tick();
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     ......I.T.
     ......ITTT
     ......I...
     ......I...`
    );
  });

  test("can wall kick rotating right if against another block", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.tick();
    board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotateLeft();
    board.tick();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     ......T.I.
     .....TTTI.
     ........I.
     ........I.`
    );
  });

  test("can wall kick rotating right if against another block", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveLeft();
    board.tick();
    board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();
    board.tick();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
     ..........
     .T.I......
     TTTI......
     ...I......
     ...I......`
    );
  });
});
