import { expect } from "chai";
import { Board } from "../src/Board.js";
import { fallToBottom, moveRight } from "./utils.js";
import { beforeEach, describe, test } from "vitest";
import { Tetromino } from "../src/Tetromino.js";

describe("Rotating Falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("T shape", () => {
    test("can be rotated right", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
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
         ....T.....
         ...TTT....
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
         ....TT....
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
         ....T.....
         ...TTT....
         ..........
         ..........
         ..........`
      );
    });

    test("cannot be rotated left when there is no room to rotate", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
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
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
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
  });

  describe("I shape", () => {
    test("can be rotated", () => {
      board.drop(Tetromino.I_SHAPE);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `.....I....
         .....I....
         .....I....
         .....I....
         ..........
         ..........`
      );
    });

    test("can be rotated more than once", () => {
      board.drop(Tetromino.I_SHAPE);
      board.rotateRight();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ...IIII...
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("cannot be rotated if it has stopped falling", () => {
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
        ..........
        ..........
        ..........
        ..........
        ...IIII...`
      );

      expect(board.hasFalling(), "the player should not be able to move the block").to.be.false;
    });

    test("cannot be rotated when there is no room to rotate 1", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         .......T..
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.I_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         .......TI.
         .......TI.
         .....TTTI.
         ....TTTTI.`
      );
    });

    test("cannot be rotated when there is no room to rotate 2", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         .......T..
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.I_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ........I.
         .......TI.
         .......TI.
         .....TTTI.
         ....TTTT..`
      );
    });
  });
});
