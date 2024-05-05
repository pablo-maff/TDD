import { describe, test } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";
import { Tetromino } from "../src/Tetromino";
import { expect } from "chai";

describe("Shuffle tetrominoes", () => {
  test("bag is created with the 7 different types of tetrominoes", () => {
    const Tetrominoes = [
      Tetromino.I_SHAPE,
      Tetromino.J_SHAPE,
      Tetromino.L_SHAPE,
      Tetromino.O_SHAPE,
      Tetromino.S_SHAPE,
      Tetromino.T_SHAPE,
      Tetromino.Z_SHAPE,
    ];

    const bag = new ShuffleBag(Tetrominoes);

    expect(bag.items.map((item) => item.toString())).to.have.members(Tetrominoes.map((item) => item.toString()));
  });
});
