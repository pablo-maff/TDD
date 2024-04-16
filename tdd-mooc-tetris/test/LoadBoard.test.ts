import { expect } from "chai";
import { Board } from "../src/Board.js";
import { describe, test } from "vitest";

describe("A board represented as a string", () => {
  test("can be loaded with a 10x6 board", () => {
    const board = Board.loadBoard(`....T.....
    ....TT....
    ....T.....
    ..........
    ..........
    ..........`);

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be loaded with a 6x4 board", () => {
    const board = Board.loadBoard(`....T.
    ....TT
    ....T.
    ......
    `);

    expect(board.toString()).to.equalShape(
      `....T.
       ....TT
       ....T.
       ......`
    );
  });
});
