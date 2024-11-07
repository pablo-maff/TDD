import { MovableShape } from "./Board.js";
import { Shape } from "./shapes.js";

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isMovableShape(shape: Shape | null): shape is MovableShape {
  return shape instanceof MovableShape;
}
