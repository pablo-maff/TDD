import { describe, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { expect } from "chai";
import { BoardScoring } from "../src/BoardScoring";

describe("Board Scoring", () => {
  test("adds 1 point when a line is cleared", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       .........
       XXXX.XXXX
       XXXX.XXXX`
    );

    const boardScoring = new BoardScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(1);
  });

  test("adds 2 points when 2 lines are cleared at the same time", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       ......XXX
       XXXX.XXXX
       XXXX.XXXX`
    );

    const boardScoring = new BoardScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(2);
  });

  test("sums up 3 points after 2 different line clear, a double and a simple one", () => {
    const board = Board.loadBoard(
      `.........
       .........
       ......XXX
       XXXX.XXXX
       XXX.XXXXX
       XXX.XXXXX`
    );

    const boardScoring = new BoardScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    board.drop(Tetromino.I_SHAPE);
    board.moveLeft();
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(3);
  });

  test("adds two points when 1 line is cleared on level 1", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       .........
       XXXX.XXXX
       XXXX.XXXX`
    );

    board.level = 1;

    const boardScoring = new BoardScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(2);
  });
});
