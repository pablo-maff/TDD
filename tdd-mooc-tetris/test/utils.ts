import { Board } from "../src/Board";
import { Observer } from "../src/Observer";
import { Tetromino } from "../src/Tetromino";

export function moveLeft(board: Board, positions: number) {
  for (let i = 0; i < positions; i++) {
    board.moveLeft();
  }
}

export function moveRight(board: Board, positions: number) {
  for (let i = 0; i < positions; i++) {
    board.moveRight();
  }
}

export function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

export function lineClear(observer: Observer, initialLevel?: number) {
  const board = Board.loadBoard(
    `.........
     .........
     .........
     .........
     XXXX.XXXX
     XXXX.XXXX`,
    initialLevel
  );

  board.events.subscribe(observer);

  board.drop(Tetromino.T_SHAPE);
  board.tick();
  board.tick();
  board.tick();
  board.tick();
  board.tick();
}

export function doubleLineClear(observer: Observer, initialLevel?: number) {
  const board = Board.loadBoard(
    `.........
     .........
     .........
     ......XXX
     XXXX.XXXX
     XXXX.XXXX`,
    initialLevel
  );

  board.events.subscribe(observer);

  board.drop(Tetromino.I_SHAPE);
  board.rotateLeft();
  board.tick();
  board.tick();
  board.tick();
}
