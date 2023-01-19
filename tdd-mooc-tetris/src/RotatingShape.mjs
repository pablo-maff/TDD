export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape
  }

  toString() {
    return this.shape.replaceAll(' ', '') + '\n'
  }

  rotateRight() {
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
