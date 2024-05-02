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

    expect(boardScoring.score).to.equal(1);
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

    expect(boardScoring.score).to.equal(2);
  });
});
