import { Tetromino } from "../src/Tetromino.js";
import { I_SHAPES, T_SHAPES } from "../src/shapes.js";

function distinctOrientations(shape: Tetromino) {
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
  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(T_SHAPES[0]);
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(T_SHAPES[1]);
  });

  test("can be rotated right more than once", () => {
    expect(shape.rotateRight().rotateRight().toString()).to.equalShape(T_SHAPES[2]);
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(T_SHAPES[3]);
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(I_SHAPES[0]);
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(I_SHAPES[1]);
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(I_SHAPES[1]);
  });

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});
