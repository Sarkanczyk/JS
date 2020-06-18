"use strict";

const board = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X"],
  ["X", "0", "Y", "0", "0", "0", "0", "0", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "Y", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "X", "0", "0", "0", "0", "Y", "0", "X"],
  ["X", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "X", "Y", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "Y", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "Y", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];

class Boarding {
  constructor(board) {
    this.board = board;
  }
  createBoard() {
    const nextBoard = new Array(this.board.length);
    for (let i = 0; i < this.board.length; i++) {
      nextBoard[i] = new Array(this.board[0].length);
      for (let j = 0; j < nextBoard[i].length; j++) {
        nextBoard[i][j] = this.board[i][j];
      }
    }
    return nextBoard;
  }
}

class Colisions {
  constructor(board, nextI, nextJ, vec) {
    this.board = board;
    this.nextI = nextI;
    this.nextJ = nextJ;
    this.vec = vec;
  }

  collisionsChecker() {
    let board = this.board;
    let nextI = this.nextI;
    let nextJ = this.nextJ;
    let vec = this.vec;
    let newVec;

    if (
      ((board[nextI][nextJ] == "X" || board[nextI][nextJ] == "XX") &&
        nextJ == 0 &&
        nextI != 1 &&
        nextI != 0 &&
        nextI != board.length - 2 &&
        nextI != board.length - 1) ||
      ((board[nextI][nextJ] == "X" || board[nextI][nextJ] == "XX") &&
        nextJ == board[0].length - 1 &&
        nextI != 6 &&
        nextI != 7 &&
        nextI != board.length - 2 &&
        nextI != board.length - 1)
    ) {
      newVec = {
        x: vec.x,
        y: -vec.y,
      };
      return newVec;
    }
    if (
      board[nextI][nextJ] == "X" ||
      (board[nextI][nextJ] == "XX" &&
        ((nextI == board.length - 1 &&
          nextJ != 0 &&
          nextJ != 1 &&
          nextJ != board[0].length - 1 &&
          nextJ != board[0].length - 2) ||
          (nextI == 6 && (nextJ == 8 || nextJ == 9))))
    ) {
      newVec = {
        x: -vec.x,
        y: vec.y,
      };
      return newVec;
    }
    if (
      board[nextI][nextJ] == "X" ||
      (board[nextI][nextJ] == "XX" && (nextJ == 3 || nextJ == 5) && nextI == 10)
    ) {
      newVec = {
        x: vec.x,
        y: -vec.y,
      };
      return newVec;
    }
    if (
      board[nextI][nextJ] == "X" ||
      (board[nextI][nextJ] == "XX" && (nextI == 9 || nextI == 11) && nextJ == 4)
    ) {
      newVec = {
        x: -vec.x,
        y: vec.y,
      };
      return newVec;
    }
    else if (board[nextI][nextJ] == "X" || board[nextI][nextJ] == "XX") {
      newVec = {
        x: -vec.x,
        y: -vec.y,
      };
      return newVec;
    }
    else if (board[nextI][nextJ] == "Y") {
      console.log(`ball hits Y at ${nextI}, ${nextJ}`);
      let randomOne = Math.random();
      if (randomOne < 0.5)
        newVec = {
          x: -vec.x,
          y: vec.y,
        };
      else {
        newVec = {
          x: vec.x,
          y: -vec.y,
        };
      }
      return newVec;
    } else {
      newVec = {
        x: vec.x,
        y: vec.y,
      };
      console.log(`ball is at ${nextI}, ${nextJ}`);
      return newVec;
    }
  }
}

class Drawing {
  constructor(nextI, nextJ) {
    this.nextI = nextI;
    this.nextJ = nextJ;
  }
  movementDraw() {
    let drawingBoard = new Boarding(board).createBoard();
    let nextI = this.nextI;
    let nextJ = this.nextJ;
    if (drawingBoard[nextI][nextJ] == "Y") {
      board[nextI][nextJ] = "0";
    } else if (drawingBoard[nextI][nextJ] == "X") {
      drawingBoard[nextI][nextJ] = "XX";
    } else {
      drawingBoard[nextI][nextJ] = "1";
    }
    return drawingBoard;
  }
}

class Movement {
  constructor(board, nextI, nextJ, x, y) {
    this.board = board;
    this.nextI = nextI;
    this.nextJ = nextJ;
    this.vec = {};
    this.vec.x = x;
    this.vec.y = y;
  }
  nextMove() {
    let board = this.board;
    let nextI = this.nextI;
    let nextJ = this.nextJ;
    let vec = this.vec;
    vec = new Colisions(board, nextI, nextJ, vec).collisionsChecker();
    nextI += vec.x;
    nextJ += vec.y;
    let props = {
      i: nextI,
      j: nextJ,
      x: vec.x,
      y: vec.y,
    };
    // console.log(board[nextI][nextJ]);
    return props;
  }
}

const fieldSize = 500;
const numOfCellsInRow = board.length;
const fps = 8;
const cellStrokeColor = "#aaa";
const cellSize = fieldSize / numOfCellsInRow;

const drawBoard = (ctx, board) => {
  ctx.strokeStyle = cellStrokeColor;
  for (let i = 0; i < board[0].length; i++) {
    for (let j = 0; j < board.length; j++) {
      const value = board[j][i];
      if (value == "XX") {
        ctx.fillStyle = "red";
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      } else if (value == "Y") {
        ctx.fillStyle = "green";
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      } else if (value != "0") {
        ctx.fillStyle = "black";
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
};

let props = {
  i: 1,
  j: 1,
  x: 1,
  y: 1,
};

const bouncing = (ctx, board) => {
  ctx.clearRect(0, 0, fieldSize, fieldSize);
  drawBoard(ctx, board);
  props = new Movement(board, props.i, props.j, props.x, props.y).nextMove();
  // console.log(props);
  const nextBoard = new Drawing(props.i, props.j).movementDraw();
  setTimeout(() => {
    requestAnimationFrame(() => bouncing(ctx, nextBoard));
  }, 1000 / fps);
};

window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const startingBoard = new Boarding(board).createBoard();
  bouncing(ctx, startingBoard);
};
