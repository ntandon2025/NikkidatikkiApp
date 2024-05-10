// script.js
const maze = document.getElementById('maze');
const moveCountSpan = document.getElementById('moveCount');
const timeSpan = document.getElementById('time');
let playerPosition = { x: 1, y: 1 }; // Starting position
let moveCount = 0;
let timeLeft = 30;
let gameTimer = null; // Ensure the timer is controlled
let avoiders = [
    { x: 12, y: 5, dx: 1, dy: 0, initialX: 12, initialY: 5 },
    { x: 5, y: 11, dx: 1, dy: 0, initialX: 5, initialY: 11 },
    { x: 14, y: 1, dx: 1, dy: 0, initialX: 14, initialY: 1 },
    { x: 13, y: 11, dx: 1, dy: 0, initialX: 13, initialY: 11 },
    { x: 3, y: 3, dx: 0, dy: -2, initialX: 3, initialY: 3 }
];



const layout = [
    '111111111111111',
    '100000001000001',
    '101111101011101',
    '101000101010001',
    '101011101010111',
    '101010000000000',
    '101011111111101',
    '100010000000001',
    '111010111110111',
    '100010100010001',
    '101110101011101',
    '100000101000001',
    '101111101011101',
    '100000001000001',
    '111111111111101'
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
    console.log(`Attempting to move to: ${newX}, ${newY}`); // Debugging output

    if (newX >= 0 && newX < layout[0].length && newY >= 0 && newY < layout.length && layout[newY][newX] === '0') {
        playerPosition.x = newX;
        playerPosition.y = newY;
        drawMaze();
        checkCollisionWithAvoiders();  // Check for collision after moving
        moveCount++;
        moveCountSpan.textContent = moveCount;
        playMoveSound();  // Play the sound on move

        console.log(`Moved to: ${newX}, ${newY}`); // Confirm movement

        if (newX === 13 && newY === 14) {  // Verify endpoint coordinates
            console.log("Endpoint reached, redirecting...");
            goToGame23Page();
        }
    } else {
        console.log("Move blocked by a wall or out of bounds.");
    }
}
function playMoveSound() {
    const sound = document.getElementById('moveSound');
    sound.currentTime = 0; // Rewind to the start if it was already playing
    sound.play();
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
        const newY = avoider.y + avoider.dy;

        if (newX >= 0 && newX < layout[0].length && newY >= 0 && newY < layout.length && layout[newY][newX] === '0') {
            avoider.x = newX;
            avoider.y = newY;
        } else {
            if (avoider.dx !== 0) { // If moving horizontally, reverse horizontal direction
                avoider.dx *= -1;
            }
            if (avoider.dy !== 0) { // If moving vertically, reverse vertical direction
                avoider.dy *= -1;
            }
        }

        // Check for collision with the player right after moving each avoider
        if (avoider.x === playerPosition.x && avoider.y === playerPosition.y) {
            resetPlayer(); // Reset player to start position if collision occurs
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

function goToGame23Page() {
    console.log("Redirecting to game23.html");
    window.location.href = 'game23.html'; // Check if this URL is correct and accessible
}

document.addEventListener('keydown', (event) => {
    console.log(event.key);  // Check which key is pressed
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
    playerPosition = { x: 1, y: 1 };

    // Reset avoiders to their initial positions
    avoiders.forEach(avoider => {
        avoider.x = avoider.initialX;
        avoider.y = avoider.initialY;
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

