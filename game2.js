// script.js
const maze = document.getElementById('maze');
const moveCountSpan = document.getElementById('moveCount');
const timeSpan = document.getElementById('time');
let playerPosition = { x: 0, y: 0 };
let moveCount = 0;
let timeLeft = 30;
let gameTimer;

const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1]
];

function drawMaze() {
    maze.innerHTML = '';
    mazeLayout.forEach((row, y) => {
        row.forEach((cell, x) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (cell === 1) cellElement.classList.add('wall');
            if (x === 0 && y === 1) {
                cellElement.classList.add('start');
                if (playerPosition.x === 0 && playerPosition.y === 0) {
                    cellElement.classList.add('player');
                    playerPosition = { x, y };
                }
            }
            if (x === 9 && y === 8) cellElement.classList.add('end');
            maze.appendChild(cellElement);
        });
    });
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10 && mazeLayout[newY][newX] === 0) {
        playerPosition = { x: newX, y: newY };
        moveCount++;
        drawMaze();
        moveCountSpan.textContent = moveCount;
    }
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
    }
}

function startGame() {
    drawMaze();
    document.addEventListener('keydown', handleKeyPress);
    gameTimer = setInterval(() => {
        timeLeft--;
        timeSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            alert('Game Over! Time up.');
        }
    }, 1000);
}

window.onload = startGame;
