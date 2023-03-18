export function moveLeft(board, positions) {
  for (let i = 0; i < positions; i++) {
    board.moveBlockLeft()
  }
}

export function moveRight(board, positions) {
  for (let i = 0; i < positions; i++) {
    board.moveBlockRight()
  }
}

export function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}