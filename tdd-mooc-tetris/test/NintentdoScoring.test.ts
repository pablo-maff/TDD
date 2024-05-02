import { describe, test } from "vitest";
import { NintendoScoring } from "../src/NintendoScoring";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Nintento Scoring system", () => {
  test("starts with 0 points", () => {
    const scoring = new NintendoScoring();

    expect(scoring.value).to.equal(0);
  });

  test("adds 40 points if 1 line is cleared", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       .........
       XXXX.XXXX
       XXXX.XXXX`
    );

    const scoring = new NintendoScoring();

    board.events.subscribe(scoring);

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(scoring.value).to.equal(40);
  });
});
