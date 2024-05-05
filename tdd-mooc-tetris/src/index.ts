import { Board } from "./Board.js";
import { NintendoScoring } from "./NintendoScoring.js";
import { ShuffleBag } from "./ShuffleBag.js";
import { Tetromino } from "./Tetromino.js";

// TODO: change this code to match the API you have created, if you want to run the game for some manual testing
function initGame() {
  const canvas = document.getElementById("game");
  console.log("canvas", canvas);
  const columns = 10;
  const rows = 20;
  const game = {
    columns,
    rows,
    tickDuration: 1000,
    nextTick: 0,
    scoring: new NintendoScoring(),
    board: new Board(columns, rows),
    tetrominoes: new ShuffleBag([
      // ! Tetrominoes are
      Tetromino.I_SHAPE,
      Tetromino.T_SHAPE,
      Tetromino.L_SHAPE,
      Tetromino.J_SHAPE,
      Tetromino.S_SHAPE,
      Tetromino.Z_SHAPE,
      Tetromino.O_SHAPE,
    ]),
  };

  game.board.events.subscribe(game.scoring);

  console.log("game", game);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      for (let i = 0; i < game.rows; i++) {
        game.board.moveDown();
      }
    } else if (event.key === "z") {
      game.board.rotateLeft();
    } else if (event.key === "x") {
      game.board.rotateRight();
    } else if (event.code === "ArrowUp") {
      game.board.rotateRight();
    } else if (event.code === "ArrowDown") {
      game.board.moveDown();
    } else if (event.code === "ArrowLeft") {
      game.board.moveLeft();
    } else if (event.code === "ArrowRight") {
      game.board.moveRight();
    } else {
      return;
    }
    event.preventDefault(); // prevent game keys from scrolling the window
  });

  const render = (timestamp: any) => {
    progressTime(game, timestamp);
    renderGame(game, canvas, timestamp);
    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);
}

// game logic

function progressTime(game: any, timestamp: any) {
  if (timestamp >= game.nextTick) {
    tick(game);
    adjustDifficulty(game);
    game.nextTick = timestamp + game.tickDuration;
  }
}

function tick(game: any) {
  if (!game.board.hasFalling()) {
    game.board.drop(game.tetrominoes.next());
  } else {
    game.board.tick();
  }
}

function adjustDifficulty(game: any) {
  const tickDuration = TICK_DURATION_PER_LEVEL[game.board.level as keyof typeof TICK_DURATION_PER_LEVEL];
  if (tickDuration) {
    game.tickDuration = tickDuration;
  }
}

const TICK_DURATION_PER_LEVEL = {
  1: 33 * 15,
  2: 33 * 13,
  3: 33 * 11,
  4: 33 * 9,
  5: 33 * 7,
  6: 33 * 5,
  7: 33 * 4,
  8: 33 * 3,
  9: 33 * 2,
  10: 33,
};

// rendering

function renderGame(game: any, canvas: any, timestamp: any) {
  const ctx = canvas.getContext("2d");
  const canvasWidth = (canvas.width = canvas.clientWidth);
  const canvasHeight = (canvas.height = canvas.clientHeight);
  const cellWidth = canvasWidth / game.columns;
  const cellHeight = canvasHeight / game.rows;

  drawBackground(ctx, canvasWidth, canvasHeight);
  for (let row = 0; row < game.rows; row++) {
    for (let column = 0; column < game.columns; column++) {
      const cell = game.board.blockAt(row, column);
      drawCell(ctx, { cell, row, column, cellWidth, cellHeight });
    }
  }
  drawScoring(ctx, {
    level: game.board.level,
    score: game.scoring.value,
    canvasWidth,
  });
}

function drawBackground(ctx: any, canvasWidth: any, canvasHeight: any) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

const CELL_COLORS: { [key: string]: string } = {
  ".": "#ffffff",
  I: "#cc1c19",
  T: "#3a88b2",
  L: "#c85c14",
  J: "#312cc3",
  S: "#921392",
  Z: "#2e9915",
  O: "#9a8016",
};

function drawCell(
  ctx: any,
  { cell, row, column, cellWidth, cellHeight }: { cell: any; row: any; column: any; cellWidth: any; cellHeight: any }
) {
  ctx.fillStyle = CELL_COLORS[cell];
  const x = cellWidth * column;
  const y = cellHeight * row;
  ctx.fillRect(x, y, cellWidth, cellHeight);
}

function drawScoring(
  ctx: { font: any; textAlign: any; fillStyle: string; fillText: (arg0: any, arg1: any, arg2: any) => void },
  { score, level, canvasWidth }: { level: any; score: any; canvasWidth: any }
) {
  const margin = 5;
  const fontSize = 22;
  drawText(ctx, {
    text: `Level ${level}`,
    x: margin,
    y: fontSize + margin,
    font: `${fontSize}px sans-serif`,
    textAlign: "left", // Add the textAlign property with the value "left"
  });
  drawText(ctx, {
    text: `Score ${score}`,
    textAlign: "right",
    x: canvasWidth - margin,
    y: fontSize + margin,
    font: `${fontSize}px sans-serif`,
  });
}

function drawText(
  ctx: { font: any; textAlign: any; fillStyle: string; fillText: (arg0: any, arg1: any, arg2: any) => void },
  { text, x, y, font, textAlign }: { text: string; x: number; y: number; font: string; textAlign: string }
) {
  ctx.font = font;
  ctx.textAlign = textAlign || "left";
  ctx.fillStyle = "#000000";
  ctx.fillText(text, x, y);
}

initGame();
