export interface Shape {
  width(): number;

  internalWidth?(): number;

  height(): number;

  blockAt(row: number, col: number): string;

  rotateRight(): Shape;

  rotateLeft(): Shape;
}

export function shapeToString(shape: Shape): string {
  let s = "";
  for (let row = 0; row < shape.height(); row++) {
    for (let col = 0; col < shape.width(); col++) {
      s += shape.blockAt(row, col);
    }
    s += "\n";
  }
  return s;
}

export const EmptyBlock = ".";

export const T_SHAPES = [
  `...
   TTT
   .T.`,
  `.T.
   TT.
   .T.`,
  `...
   .T.
   TTT`,
  `.T.
   .TT
   .T.`,
];

export const I_SHAPES = [
  `....
   IIII
   ....
   ....`,
  `..I.
   ..I.
   ..I.
   ..I.`,
];

export const O_SHAPES = [
  `...
   .OO
   .OO`,
];
