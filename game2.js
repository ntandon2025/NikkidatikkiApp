// script.js
const maze = document.getElementById('maze');
const moveCountSpan = document.getElementById('moveCount');
const timeSpan = document.getElementById('time');
let playerPosition = { x: 1, y: 1 }; // Set initial position to an open spot
let moveCount = 0;
let timeLeft = 30;
let gameTimer = null; // Ensure the timer is controlled

const layout = [
    '1111111111',
    '1001001001',
    '1011011011',
    '1000000001',
    '1111111101',
    '1001001001',
    '1011111001',
    '1000000001',
    '1111011111',
    '1111011111'
].map(row => row.split(''));

function drawMaze() {
    maze.innerHTML = '';
    layout.forEach((row, y) => {
        row.forEach((cell, x) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell ' + (cell === '1' ? 'wall' : '');
            if (x === playerPosition.x && y === playerPosition.y) {
                cellElement.classList.add('player');
            }
            maze.appendChild(cellElement);
        });
    });
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10 && layout[newY][newX] === '0') {
        playerPosition.x = newX;
        playerPosition.y = newY;
        drawMaze();
        moveCount++;
        moveCountSpan.textContent = moveCount;
        // Check if the player has reached the "X" marked square
        if (newX === 4 && newY === 9) {
            goToGame22Page();
        }
    }
}

function goToGame22Page() {
    window.location.href = 'game22.html'; // Redirect to another page when "X" is reached
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
    }
});

function startGame() {
    if (gameTimer !== null) return; // Prevent multiple timers
    gameTimer = setInterval(() => {
        timeLeft--;
        timeSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            gameOver();
        }
    }, 1000);
    drawMaze();
}

function stopTimer() {
    clearInterval(gameTimer);
    gameTimer = null;
}

function resetGame() {
    stopTimer();
    moveCount = 0;
    timeLeft = 30;
    moveCountSpan.textContent = moveCount;
    timeSpan.textContent = timeLeft;
    playerPosition = { x: 1, y: 1 };
    drawMaze();
}

function gameOver() {
    alert('Game Over! Time up or stopped.');
    resetGame();
}

function goToHomePage() {
    window.location.href = 'home.html'; // Correct homepage URL
}

window.onload = resetGame; // Set up the game without starting

