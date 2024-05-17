export class Chess {
  constructor() {
    this.canvas = document.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
    this.boardSize = 8;
    this.cellSize = 60;
    this.imageSrc =
      "https://static.vecteezy.com/system/resources/previews/019/002/970/original/gold-horse-knight-chess-icon-png.png";
    this.initChess();
  }

  initChess() {
    this.drawChessBoard();
    this.addHorseButton();
  }

  drawChessBoard() {
    const letters = "ABCDEFGH";
    this.ctx.font = "20px bold";
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        this.ctx.fillStyle = (i + j) % 2 == 0 ? "#eeeed2" : "#000000";
        this.ctx.fillRect(
          50 + this.cellSize * j,
          50 + this.cellSize * i,
          this.cellSize,
          this.cellSize
        );
      }
      this.ctx.fillText(letters[i], 75 + this.cellSize * i, 35);
      this.ctx.fillText(this.boardSize - i, 25, 95 + this.cellSize * i);
    }
  }

  addHorseButton() {
    const horseBtn = document.getElementById("horseBtn");
    horseBtn.onclick = () => this.getHorse();
  }

  getHorse() {
    const code = prompt("Enter the position (e.g., A1)");
    const pattern = /^[A-H][1-8]$/;
    if (!pattern.test(code)) {
      alert("Error: Enter a correct position (e.g., A1)");
      return;
    }
    const letters = "ABCDEFGH";
    const [x, y] = [...code];
    const xPos = letters.indexOf(x);
    const yPos = this.boardSize - y;
    const img = new Image();
    img.src = this.imageSrc;
    img.onload = () => {
      this.ctx.drawImage(
        img,
        50 + this.cellSize * xPos,
        50 + this.cellSize * yPos,
        this.cellSize,
        this.cellSize
      );
      this.highlightMoves(xPos, yPos);
    };
  }

  highlightMoves(x, y) {
    const moves = [
      [x + 1, y - 2],
      [x - 1, y - 2],
      [x + 1, y + 2],
      [x - 1, y + 2],
      [x + 2, y - 1],
      [x + 2, y + 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
    ].filter(
      ([x, y]) => x >= 0 && y >= 0 && x < this.boardSize && y < this.boardSize
    );

    moves.forEach(([x, y]) => {
      this.ctx.fillStyle = "RED";
      this.ctx.fillRect(
        50 + this.cellSize * x,
        50 + this.cellSize * y,
        this.cellSize,
        this.cellSize
      );
    });
  }
}
