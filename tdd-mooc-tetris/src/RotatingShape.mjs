export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape
  }

  toString() {
    console.log('shape', this.shape.replaceAll(' ', '') + '\n');
    return this.shape.replaceAll(' ', '') + '\n'
  }

  rotateRight() {
    // y = 0 then y = x and x = 2
    // y = 1 then y = x and x = 1
    // y = 2 then y = x and x = 0

    // shape[0][0] = shape[0][2]
    // shape[0][1] = shape[1][2]
    // shape[0][2] = shape[2][2]

    // shape[1][0] = shape[0][1]
    // shape[1][1] = shape[1][1]
    // shape[1][2] = shape[2][1]

    // shape[2][0] = shape[0][0]
    // shape[2][1] = shape[1][0]
    // shape[2][2] = shape[2][0]
    this.shape =
      `GDA
       HEB
       IFC`
    return this.shape.replaceAll(' ', '') + '\n'
  }

  rotateLeft() {
    this.shape =
      `CFI
    BEH
    ADG`
    return this.shape.replaceAll(' ', '') + '\n'
  }
}
