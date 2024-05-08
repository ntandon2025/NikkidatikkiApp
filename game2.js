// script.js
const maze = document.getElementById('maze');
const moveCountSpan = document.getElementById('moveCount');
const timeSpan = document.getElementById('time');
let playerPosition = { x: 1, y: 1 }; // Set initial position to an open spot
let moveCount = 0;
let timeLeft = 30;
let gameTimer = null; // Ensure the timer is controlled
let avoiders = [
    { x: 8, y: 3, dx: 1, dy: 0, initialX: 8, initialY: 3 }, // Moves horizontally
    { x: 8, y: 7, dx: 1, dy: 0, initialX: 8, initialY: 7 }  // Moves horizontally
];




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
            avoiders.forEach(avoider => {
                if (x === avoider.x && y === avoider.y) {
                    cellElement.classList.add('avoider'); // Ensure this class is added
                }
            });
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
        checkCollisionWithAvoiders();  // Check for collision after moving
        drawMaze();
        moveCount++;
        moveCountSpan.textContent = moveCount;
        if (newX === 4 && newY === 9) {  // Assuming this is your goal position
            goToGame22Page();
        }
    }
}
function resetPlayer() {
    playerPosition = { x: 1, y: 1 }; // Reset to start position
    moveCount = 0;
    moveCountSpan.textContent = moveCount;
    drawMaze();
}

function moveAvoiders() {
    avoiders.forEach(avoider => {
        const newX = avoider.x + avoider.dx;
        if (newX >= 0 && newX < layout[0].length && layout[avoider.y][newX] === '0') {
            avoider.x = newX;
        } else {
            avoider.dx *= -1; // Change direction on collision with wall
        }
        // Check for collision with the player right after moving each avoider
        if (avoider.x === playerPosition.x && avoider.y === playerPosition.y) {
            resetPlayer();
        }
    });
}
function checkCollisionWithAvoiders() {
    avoiders.forEach(avoider => {
        if (avoider.x === playerPosition.x && avoider.y === playerPosition.y) {
            resetPlayer();  // Reset player to start position if collision occurs
        }
    });
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
    if (gameTimer !== null) return;
    resetGame(); // Reset the game to its initial state
    gameTimer = setInterval(() => {
        timeLeft--;
        timeSpan.textContent = timeLeft;
        moveAvoiders(); // Updates avoider positions
        drawMaze(); // Redraw the maze with updated avoider positions
        if (timeLeft <= 0) {
            gameOver();
        }
    }, 1000);
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
    playerPosition = { x: 1, y: 1 }; // Reset player position

    // Reset avoiders to their initial positions
    avoiders.forEach(avoider => {
        avoider.x = avoider.initialX;
        avoider.y = avoider.initialY;
        avoider.dx = Math.abs(avoider.dx); // Reset direction if you want to ensure it starts the same way each time
    });

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

