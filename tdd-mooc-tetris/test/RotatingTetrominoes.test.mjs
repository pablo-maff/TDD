import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { TetrominoArika } from "../src/TetrominoArika.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE;
  const shape2 = TetrominoArika.T_SHAPE;

  it("initial orientation", () => {
    expect(shape2.toString()).to.equalShape(
      `....
       TTT.
       .T..
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape2.rotateRight().toString()).to.equalShape(
      `.T..
       TT..
       .T..
       ....`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape2.rotateLeft().toString()).to.equalShape(
      `.T..
       .TT.
       .T..
       ....`
    );
  });

  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape2).size).to.equal(4);
  });

  xit("can be rotated right/clockwise many times", () => {
    expect(shape2.rotateRight().rotateRight().rotateRight().rotateRight().rotateRight().toString()).to.equalShape(
      `.T..
       TT..
       .T..
       ....`
    )
  })
});

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.....
       .....
       IIII.
       .....
       .....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});
