import { describe, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { expect } from "chai";
import { BoardScoring } from "../src/BoardScoring";

describe("Board Scoring", () => {
  test("adds 1 point when a line is cleared", () => {
    const score = BoardScoring.score();
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

    expect(score).to.equal(1);
  });

  test.skip("adds 2 points when 2 lines are cleared at the same time", () => {
    const score = BoardScoring.score();
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

    expect(score).to.equal(2);
  });
});
