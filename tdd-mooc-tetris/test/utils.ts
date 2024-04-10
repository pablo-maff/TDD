import { Board } from "../src/Board";

export function moveLeft(board: Board, positions: number) {
  for (let i = 0; i < positions; i++) {
    board.moveBlockLeft();
  }
}

export function moveRight(board: Board, positions: number) {
  for (let i = 0; i < positions; i++) {
    board.moveBlockRight();
  }
}

export function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}
