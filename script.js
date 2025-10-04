const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const modeSelect = document.getElementById("modeSelect");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsAI = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  boardEl.innerHTML = "";
  board.forEach((cell, index) => {
    const cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.dataset.index = index;
    cellEl.textContent = cell;
    cellEl.addEventListener("click", handleCellClick);
    boardEl.appendChild(cellEl);
  });
  updateStatus();
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusEl.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();

  if (vsAI && currentPlayer === "O") {
    setTimeout(aiMove, 400);
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function updateStatus() {
  if (gameActive) {
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function aiMove() {
  const emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter(v => v !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "O";
  createBoard();
  if (checkWinner()) {
    statusEl.textContent = "Computer wins! 🤖";
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = "X";
    updateStatus();
  }
}

resetBtn.addEventListener("click", resetGame);
modeSelect.addEventListener("change", () => {
  vsAI = modeSelect.value === "ai";
  resetGame();
});

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  createBoard();
}

// Initialize
createBoard();
