const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

const rows = 6;
const columns = 7;
const board = [];
let currentPlayer = 'red';

function createBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
            board[row][col] = null;
        }
    }
    updateStatus();
}

function handleCellClick(event) {
    const col = event.target.dataset.col;
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            const cell = gameBoard.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                statusDisplay.textContent = `${currentPlayer.toUpperCase()} wins!`;
                gameBoard.removeEventListener('click', handleCellClick);
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            updateStatus();
            return;
        }
    }
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) ||  // Horizontal
           checkDirection(row, col, 0, 1) ||  // Vertical
           checkDirection(row, col, 1, 1) ||  // Diagonal /
           checkDirection(row, col, 1, -1);   // Diagonal \
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    let r = row + rowDir;
    let c = col + colDir;
    while (isValid(r, c) && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }
    r = row - rowDir;
    c = col - colDir;
    while (isValid(r, c) && board[r][c] === currentPlayer) {
        count++;
        r -= rowDir;
        c -= colDir;
    }
    return count >= 4;
}

function isValid(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < columns;
}

function updateStatus() {
    statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
}

restartButton.addEventListener('click', createBoard);

createBoard();
