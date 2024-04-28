import { expect } from "chai";
import { Board } from "../src/Board.js";
import { moveLeft, moveRight } from "./utils.js";
import { beforeEach, describe, test } from "vitest";
import { Tetromino } from "../src/Tetromino.js";

describe("Rotating Falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("T shape", () => {
    test("can wall kick rotating on the left side of the wall", () => {
      board.drop(Tetromino.T_SHAPE);
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

    test("can wall kick on the right side of the wall", () => {
      board.drop(Tetromino.T_SHAPE);
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

    test("can wall kick if collides with another block 1", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ....I.....
         ....I.....
         ....I.....
         ....I.....`
      );

      board.drop(Tetromino.T_SHAPE);
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

    test("can wall kick if collides with another block 2", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         ......T...
         .....TT...
         ......T...`
      );

      board.drop(Tetromino.T_SHAPE);
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

    test("can wall kick if collides with another block 3", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ........I.
         ........I.
         ........I.
         ........I.`
      );

      board.drop(Tetromino.T_SHAPE);
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

    test("can wall kick if collides with another block 4", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ...I......
         ...I......
         ...I......
         ...I......`
      );

      board.drop(Tetromino.T_SHAPE);
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

    test("can escape from a hollow by floor kicking", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         X.........
         X.........
         X.........
         XX.XXX....`
      );

      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.rotateRight();
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         X.........
         X.T.......
         XTTT......
         XX.XXX....`
      );
    });
  });

  describe("I shape", () => {
    test("can wall kick on the left side of the wall", () => {
      board.drop(Tetromino.I_SHAPE);
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

    test("can wall kick on the right side of the wall", () => {
      board.drop(Tetromino.I_SHAPE);
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

    test("can wall kick if collides with another block 1", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ....I.....
         ....I.....
         ....I.....
         ....I.....`
      );

      board.drop(Tetromino.I_SHAPE);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....I.....
         ....IIIII.
         ....I.....
         ....I.....`
      );
    });

    test("can wall kick if collides with another block 2", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ....I.....
         ....I.....
         ....I.....
         ....I.....`
      );

      board.drop(Tetromino.I_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....I.....
         IIIII.....
         ....I.....
         ....I.....`
      );
    });

    test("can wall kick if collides with another block 3", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         II........
         II........
         II........
         II........`
      );

      board.drop(Tetromino.I_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         IIIIII....
         II........
         II........
         II........`
      );
    });

    test("can double wall kick if collides with another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         II........
         II........
         II........
         II........`
      );

      board.drop(Tetromino.I_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         IIIIII....
         II........
         II........
         II........`
      );
    });

    test("can floor kick on the floor row", () => {
      board.drop(Tetromino.I_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         .....I....
         .....I....
         .....I....
         .....I....`
      );
    });

    test("can floor kick on top of blocks", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         ..........
         ...IIII...
         ...IIII...`
      );

      board.drop(Tetromino.I_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `.....I....
         .....I....
         .....I....
         .....I....
         ...IIII...
         ...IIII...`
      );
    });

    test("can't floor kick if it is on the air above another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         ..........
         ..........
         ...IIII...`
      );

      board.drop(Tetromino.I_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ...IIII...
         ..........
         ...IIII...`
      );
    });

    test("can floor kick when collision happens on the side, wall kick is not possible, and the space above is empty", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.I_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ......IIII
       .......T..
       .....TTT..
       ....TTTT..`
      );
    });
  });
});
