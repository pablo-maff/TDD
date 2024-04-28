import { expect } from "chai";
import { Board } from "../src/Board.js";
import { describe, test } from "vitest";
import { Tetromino } from "../src/Tetromino.js";

describe("Mihara's conspiracy", () => {
  test("L fits empty hole on the right", () => {
    const board = Board.loadBoard(
      `..........
       ..........
       ..........
       ......XX..
       .......X..
       ...X.XXX..`
    );

    board.drop(Tetromino.L_SHAPE);
    board.rotateRight();
    board.tick();
    board.tick();
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......XX..
       ....LLLX..
       ...XLXXX..`
    );
  });

  test("J doesn't fit empty hole on the left if kicking right is possible", () => {
    const board = Board.loadBoard(
      `..........
       ..........
       ..........
       .XX.......
       .X........
       .XXX.X....`
    );

    board.drop(Tetromino.J_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .XX.......
       .X..JJJ...
       .XXX.XJ...`
    );
  });

  test("J fits empty hole on the left if kicking right is not possible", () => {
    const board = Board.loadBoard(
      `..........
       ..........
       ..........
       .XX...X...
       .X....X...
       .XXX.XX...`
    );

    board.drop(Tetromino.J_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .XX...X...
       .XJJJ.X...
       .XXXJXX...`
    );
  });
});
