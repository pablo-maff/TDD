import { describe, test } from "vitest";
import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.js";

describe("Rotating 3x3 shape", () => {
  const shape: RotatingShape = new RotatingShape(
    `ABC
     DEF
     GHI`
  );

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `ABC
       DEF
       GHI`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `GDA
       HEB
       IFC`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `CFI
       BEH
       ADG`
    );
  });
});

describe("Rotating 5x5 shape", () => {
  const shape: RotatingShape = new RotatingShape(
    `ABCDE
     FGHIJ
     KLMNO
     PQRST
     UVWXY`
  );

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `ABCDE
       FGHIJ
       KLMNO
       PQRST
       UVWXY`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `UPKFA
       VQLGB
       WRMHC
       XSNID
       YTOJE`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `EJOTY
       DINSX
       CHMRW
       BGLQV
       AFKPU`
    );
  });
});