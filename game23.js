// script.js
const maze = document.getElementById('maze');
const moveCountSpan = document.getElementById('moveCount');
const timeSpan = document.getElementById('time');
let playerPosition = { x: 1, y: 1 }; // Starting position
let moveCount = 0;
let timeLeft = 30;
let gameTimer = null; // Ensure the timer is controlled
let avoiders = [
    { x: 12, y: 6, dx: 1, dy: 0, initialX: 12, initialY: 5 },
    { x: 5, y: 11, dx: 1, dy: 0, initialX: 5, initialY: 11 },
    { x: 19, y: 1, dx: 1, dy: 0, initialX: 19, initialY: 1 },
    { x: 13, y: 11, dx: -1, dy: 0, initialX: 13, initialY: 11 },
    { x: 3, y: 3, dx: 0, dy: -2, initialX: 3, initialY: 3 },
    { x: 1, y: 8, dx: 2, dy: 0, initialX: 1, initialY: 8 },
    { x: 17, y: 3, dx: -1, dy: 0, initialX: 17, initialY: 3 },
    { x: 15, y: 17, dx: -1, dy: 0, initialX: 15, initialY: 17 },
    // Add two new avoiders with their properties
    { x: 10, y: 10, dx: 0, dy: -1, initialX: 10, initialY: 10 },

    { x: 7, y: 4, dx: -1, dy: 0, initialX: 7, initialY: 4 }
];



const layout = [
    '11111111111111111111',//1
    '10000000000100000000',//2
    '10111111110101111101',//3
    '10000000000001000001',//4
    '11101111111111101111',//5
    '10001000000000000001',//6
    '10111011111111111101',//7
    '10000010000000100001',//8
    '10111110111110101111',//9
    '10000000100010100001',//10
    '10111110101110111101',//11
    '10100000101000100001',//12
    '10101111111110101111',//13
    '10101000000000101001',//14
    '11101011111111101011',//15
    '10001000000000001001',//16
    '10101111101111111001',//17
    '10100000001000000001',//18
    '10111111111011111101',//19
    '10000000000000000011',//20
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

        if (newX === 18 && newY === 13) {  // Verify endpoint coordinates
            console.log("Endpoint reached, redirecting...");
            goToGame23Page();
            resetPlayer()
            resetGame()
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

function closeMessage() {
    document.querySelector('.game-message').style.display = 'none';  // Hide the message box
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
            playCollisionSound()
            resetPlayer(); // Reset player to start position if collision occurs
        }
    });
}


function checkCollisionWithAvoiders() {
    avoiders.forEach(avoider => {
        if (avoider.x === playerPosition.x && avoider.y === playerPosition.y) {
            playCollisionSound()
            resetPlayer();  // Reset player to start position if collision occurs
        }
    });
}
function playCollisionSound() {
    const sound = document.getElementById('collisionSound');
    sound.currentTime = 0; // Rewind to the start if it was already playing
    sound.play();
}

function goToGame23Page() {
    console.log("Endpoint reached, displaying celebration option...");
    document.querySelector('.game-message').style.display = 'block'; // Show the game message with the Celebrate button
    const victorySound = document.getElementById('victorySound'); // Ensure you have this sound element in HTML
    victorySound.play();
}
function startConfetti() {
    var duration = 15 * 1000; // 15 seconds in milliseconds
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // Create confetti from different origins on the screen
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
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
    timeLeft = 60;
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

