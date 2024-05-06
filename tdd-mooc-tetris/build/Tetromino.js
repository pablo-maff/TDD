import { I_SHAPES, J_SHAPES, L_SHAPES, O_SHAPES, S_SHAPES, T_SHAPES, Z_SHAPES, shapeToString, } from "./shapes.js";
export class Tetromino {
    static T_SHAPE = new Tetromino(0, T_SHAPES);
    static I_SHAPE = new Tetromino(0, I_SHAPES);
    static O_SHAPE = new Tetromino(0, O_SHAPES);
    static L_SHAPE = new Tetromino(0, L_SHAPES);
    static J_SHAPE = new Tetromino(0, J_SHAPES);
    static S_SHAPE = new Tetromino(0, S_SHAPES);
    static Z_SHAPE = new Tetromino(0, Z_SHAPES);
    #currentOrientation;
    #orientations;
    #shape;
    constructor(currentOrientation, orientations) {
        this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
        this.#orientations = orientations;
        this.#shape = this.#orientations[this.#currentOrientation]
            .replaceAll(" ", "")
            .trim()
            .split("\n")
            .map((row) => row.split(""));
    }
    rotateRight() {
        return new Tetromino(this.#currentOrientation + 1, this.#orientations);
    }
    rotateLeft() {
        return new Tetromino(this.#currentOrientation - 1, this.#orientations);
    }
    width() {
        return this.#shape[0].length;
    }
    height() {
        return this.#shape.length;
    }
    blockAt(row, col) {
        return this.#shape[row][col];
    }
    toString() {
        return shapeToString(this);
    }
}
