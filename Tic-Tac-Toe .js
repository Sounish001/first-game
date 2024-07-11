const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const resultModal = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const closeModal = document.getElementById('close-modal');
const playAgainButton = document.getElementById('play-again');
const nameModal = document.getElementById('name-modal');
const playerXNameInput = document.getElementById('player-x-name-input');
const playerONameInput = document.getElementById('player-o-name-input');
const saveNamesButton = document.getElementById('save-names');
const editXNameButton = document.getElementById('edit-x-name');
const editONameButton = document.getElementById('edit-o-name');
const playerXNameDisplay = document.getElementById('player-x-name');
const playerONameDisplay = document.getElementById('player-o-name');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let playerXName = '';
let playerOName = '';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== '' || cell.innerText !== '') {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWinner()) {
        showResult(`Player ${currentPlayer === 'X' ? playerXName : playerOName} wins!`);
        return;
    }

    if (!gameState.includes('')) {
        showResult('Game is a draw!');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
};

const showResult = (message) => {
    resultMessage.innerText = message;
    resultModal.classList.add('show');
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    resultModal.classList.remove('show');
};

const savePlayerNames = () => {
    playerXName = playerXNameInput.value.trim();
    playerOName = playerONameInput.value.trim();
    if (playerXName && playerOName) {
        localStorage.setItem('ticTacToePlayerXName', playerXName);
        localStorage.setItem('ticTacToePlayerOName', playerOName);
        playerXNameDisplay.innerText = `Player X: ${playerXName}`;
        playerONameDisplay.innerText = `Player O: ${playerOName}`;
        nameModal.classList.remove('show');
    }
};

const loadPlayerNames = () => {
    playerXName = localStorage.getItem('ticTacToePlayerXName') || 'Player X';
    playerOName = localStorage.getItem('ticTacToePlayerOName') || 'Player O';
    playerXNameDisplay.innerText = `Player X: ${playerXName}`;
    playerONameDisplay.innerText = `Player O: ${playerOName}`;
    nameModal.classList.add('show');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame);
closeModal.addEventListener('click', () => resultModal.classList.remove('show'));
saveNamesButton.addEventListener('click', savePlayerNames);
editXNameButton.addEventListener('click', () => nameModal.classList.add('show'));
editONameButton.addEventListener('click', () => nameModal.classList.add('show'));

window.addEventListener('DOMContentLoaded', loadPlayerNames);
