import { expect } from "chai";
import { Board } from "../src/Board.js";
import { fallToBottom, moveLeft, moveRight } from "./utils.js";
import { beforeEach, describe, test } from "vitest";
import { Tetromino2 } from "../src/Tetromino2.js";

describe("Rotating Falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });
  describe("T shape", () => {
    test("can be rotated right", () => {
      board.drop2(Tetromino2.T_SHAPE);
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
      board.drop2(Tetromino2.T_SHAPE);
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
      board.drop2(Tetromino2.T_SHAPE);
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
      board.drop2(Tetromino2.T_SHAPE);
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

    test("cannot be rotated if it has stopped falling", () => {
      board.drop2(Tetromino2.T_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...TTT....
         ....T.....`
      );

      expect(board.hasFalling(), "the player should not be able to move the block").to.be.false;
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

      board.drop2(Tetromino2.T_SHAPE);
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

      board.drop2(Tetromino2.T_SHAPE);
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

    test("can wall kick rotating right on the left side of the wall", () => {
      board.drop2(Tetromino2.T_SHAPE);
      board.tick();
      board.tick();
      board.rotateLeft();
      moveLeft(board, 10);
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
      board.drop2(Tetromino2.T_SHAPE);
      board.tick();
      board.tick();
      board.rotateRight();
      moveRight(board, 10);
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
      const board = Board.loadBoard(
        `..........
         ..........
         ....I.....
         ....I.....
         ....I.....
         ....I.....`
      );

      board.drop2(Tetromino2.T_SHAPE);
      board.moveRight();
      board.rotateLeft();
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
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         ......T...
         .....TT...
         ......T...`
      );

      board.drop2(Tetromino2.T_SHAPE);
      moveRight(board, 3);
      board.rotateLeft();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ........T.
       ......TTTT
       .....TT...
       ......T...`
      );
    });

    test("can wall kick rotating right if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ........I.
         ........I.
         ........I.
         ........I.`
      );

      board.drop2(Tetromino2.T_SHAPE);
      moveRight(board, 3);
      board.rotateRight();
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
      const board = Board.loadBoard(
        `..........
         ..........
         ...I......
         ...I......
         ...I......
         ...I......`
      );

      board.drop2(Tetromino2.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.rotateRight();
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

  describe("I shape", () => {
    test("can be rotated right", () => {
      board.drop2(Tetromino2.I_SHAPE);
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

    test("can be rotated right more than once", () => {
      board.drop2(Tetromino2.I_SHAPE);
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

    test("can be rotated left", () => {
      board.drop2(Tetromino2.I_SHAPE);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `.....I....
         .....I....
         .....I....
         .....I....
         ..........
         ..........`
      );
    });

    test("can be rotated left more than once", () => {
      board.drop2(Tetromino2.I_SHAPE);
      board.rotateLeft();
      board.rotateLeft();

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
      board.drop2(Tetromino2.I_SHAPE);
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

    test("cannot be rotated left when there is no room to rotate", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop2(Tetromino2.I_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ........I.
         .......TI.
         .....TTTI.
         ....TTTTI.`
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

      board.drop2(Tetromino2.I_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ........I.
         .......TI.
         .....TTTI.
         ....TTTTI.`
      );
    });

    test("can wall kick rotating left on the left side of the wall", () => {
      board.drop2(Tetromino2.I_SHAPE);
      board.rotateLeft();
      moveLeft(board, 10);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         IIII......
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("can wall kick rotating right on the left side of the wall", () => {
      board.drop2(Tetromino2.I_SHAPE);
      board.rotateLeft();
      moveLeft(board, 10);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         IIII......
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("can wall kick rotating left on the right side of the wall", () => {
      board.drop2(Tetromino2.I_SHAPE);
      board.rotateLeft();
      moveRight(board, 10);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ......IIII
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("can wall kick rotating right on the right side of the wall", () => {
      board.drop2(Tetromino2.I_SHAPE);
      board.rotateLeft();
      moveRight(board, 10);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ......IIII
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("can wall kick rotating left if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ....I.....
         ....I.....
         ....I.....
         ....I.....`
      );

      board.drop2(Tetromino2.I_SHAPE);
      board.rotateLeft();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....IIIII.
         ....I.....
         ....I.....
         ....I.....`
      );
    });

    test("can wall kick rotating left if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         ......T...
         .....TT...
         ......T...`
      );

      board.drop2(Tetromino2.T_SHAPE);
      moveRight(board, 3);
      board.rotateLeft();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ........T.
       ......TTTT
       .....TT...
       ......T...`
      );
    });

    test("can wall kick rotating right if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ........I.
         ........I.
         ........I.
         ........I.`
      );

      board.drop2(Tetromino2.T_SHAPE);
      moveRight(board, 3);
      board.rotateRight();
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
      const board = Board.loadBoard(
        `..........
         ..........
         ...I......
         ...I......
         ...I......
         ...I......`
      );

      board.drop2(Tetromino2.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.rotateRight();
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
});
