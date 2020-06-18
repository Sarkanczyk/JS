const fieldSize = 400;
const numOfCellsInRow = 15;
const fps = 8;
class RandomBoard {
  constructor(numOfCellsInRow) {
    this.numOfCellsInRow = numOfCellsInRow;
  }
  getRandomBoard() {
    const board = new Array(this.numOfCellsInRow);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(this.numOfCellsInRow);
      for (let j = 0; j < board.length; j++) {
        board[i][j] = Math.floor(Math.random() * 2);
      }
    }
    return board;
  }
}

class NextGeneration {
  constructor(board) {
    this.board = board;
  }
  getNextGeneration() {
    const nextBoard = new Array(this.board.length);
    for (let i = 0; i < this.board.length; i++) {
      nextBoard[i] = new Array(this.board.length);
      for (let j = 0; j < nextBoard[i].length; j++) {
        const value = this.board[i][j];
        const neighbours = new Neighbours(this.board, i, j).countNeighbours();
        if (value === 0 && neighbours === 3) {
          nextBoard[i][j] = 1;
        } else if (value === 1 && (neighbours < 2 || neighbours > 3)) {
          nextBoard[i][j] = 0;
        } else {
          nextBoard[i][j] = value;
        }
      }
    }
    return nextBoard;
  }
}

class Neighbours {
  constructor(board, x, y) {
    this.board = board;
    this.x = x;
    this.y = y;
  }
  countNeighbours() {
    const numberOfRows = this.board.length;
    const numberOfCols = this.board[0].length;
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const row = this.x + i;
        const col = this.y + j;
        if (
          row >= 0 &&
          row <= numberOfRows - 1 &&
          col >= 0 &&
          col <= numberOfCols - 1
        ) {
          sum += this.board[row][col];
        }
      }
    }
    sum -= this.board[this.x][this.y];
    return sum;
  }
}

const cellStrokeColor = "#aaa";
const cellSize = fieldSize / numOfCellsInRow;
const drawBoard = (ctx, board) => {
  ctx.strokeStyle = cellStrokeColor;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const value = board[i][j];
      if (value) {
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
};
const generation = (ctx, board) => {
  ctx.clearRect(0, 0, fieldSize, fieldSize);
  drawBoard(ctx, board);
  const boardOfNextGeneration = new NextGeneration(board).getNextGeneration();
  setTimeout(() => {
    requestAnimationFrame(() => generation(ctx, boardOfNextGeneration));
  }, 5000 / fps);
};

window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const board = new RandomBoard(numOfCellsInRow).getRandomBoard();
  generation(ctx, board);
};
