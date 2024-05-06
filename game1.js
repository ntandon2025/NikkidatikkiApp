const canvas = document.getElementById('mazeCanvas'); // Define canvas globally
let gameStarted = false; // Define gameStarted globally

document.addEventListener('DOMContentLoaded', function() {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 800;
    const height = canvas.height = 800;
    const cellSize = 40;
    const grid = [];
    const stack = [];
    let player = { x: 20, y: 20, width: 30, height: 30 };

    function initGrid() {
        for (let x = 0; x < width / cellSize; x++) {
            grid[x] = [];
            for (let y = 0; y < height / cellSize; y++) {
                grid[x][y] = {
                    x: x,
                    y: y,
                    walls: [true, true, true, true], // Top, Right, Bottom, Left
                    visited: false
                };
            }
        }
    }
    // Carve passages using Recursive Backtracking
    function carvePassages(x, y) {
        grid[x][y].visited = true;
        const directions = shuffle([0, 1, 2, 3]); // Represents directions [Top, Right, Bottom, Left]

        directions.forEach(function(direction) {
            const nx = x + (direction === 1 ? 1 : direction === 3 ? -1 : 0);
            const ny = y + (direction === 0 ? -1 : direction === 2 ? 1 : 0);

            if (nx >= 0 && nx < width / cellSize && ny >= 0 && ny < height / cellSize && !grid[nx][ny].visited) {
                grid[x][y].walls[direction] = false;
                grid[nx][ny].walls[(direction + 2) % 4] = false;
                carvePassages(nx, ny);
            }
        });
    }

    // Shuffle array utility
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Draw the maze
    function drawMaze() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'white';
        for (let x = 0; x < width / cellSize; x++) {
            for (let y = 0; y < height / cellSize; y++) {
                drawCell(x, y);
            }
        }
    }

   function drawCell(x, y) {
        const cell = grid[x][y];
        const xPos = x * cellSize;
        const yPos = y * cellSize;
        ctx.beginPath();
        if (cell.walls[0]) { ctx.moveTo(xPos, yPos); ctx.lineTo(xPos + cellSize, yPos); } // Top
        if (cell.walls[1]) { ctx.moveTo(xPos + cellSize, yPos); ctx.lineTo(xPos + cellSize, yPos + cellSize); } // Right
        if (cell.walls[2]) { ctx.moveTo(xPos + cellSize, yPos + cellSize); ctx.lineTo(xPos, yPos + cellSize); } // Bottom
        if (cell.walls[3]) { ctx.moveTo(xPos, yPos + cellSize); ctx.lineTo(xPos, yPos); } // Left
        ctx.stroke();
    }

    // Define checkpoints and the endpoint
    let checkpoints = [
        { x: 7, y: 7 }, // Adjusted for clarity
        { x: 13, y: 15 },
        { x: 19, y: 19 }
    ];

    // Draw checkpoints
    function drawCheckpoints() {
        checkpoints.forEach(cp => {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(cp.x * cellSize + 10, cp.y * cellSize + 10, cellSize - 20, cellSize - 20);
        });
        // Draw end platform (green box)
        ctx.fillStyle = 'green';
        ctx.fillRect(width - cellSize, height - cellSize, cellSize, cellSize);
    }

    initGrid();
    carvePassages(0, 0);
    drawMaze();
    drawCheckpoints();
    setupEventListeners();
    gameLoop();// Initial call to start the game loop

});
function setupEventListeners() {
    canvas.addEventListener('mousemove', function(event) {
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }
        player.x = event.offsetX - player.width / 2;
        player.y = event.offsetY - player.height / 2;
        gameLoop();
    });

    document.getElementById('restartBtn').addEventListener('click', resetGame);
}


    function startTimer() {
        let startTime = Date.now();
        timerInterval = setInterval(function() {
            let elapsedTime = Date.now() - startTime;
            document.getElementById('timer').textContent = formatTime(elapsedTime);
        }, 1000);
    }

    function resetGame() {
        clearInterval(timerInterval);
        document.getElementById('timer').textContent = "00:00";
        document.getElementById('checkpointStars').innerHTML = '';
        player.x = 20;
        player.y = 20;
        checkpoints.forEach(checkpoint => checkpoint.activated = false);
        gameStarted = false;
        gameLoop();
    }

    document.getElementById('restartBtn').addEventListener('click', resetGame);

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        drawPlayer(); // Draw the player
        checkCollisions();
        if (gameStarted) {
            requestAnimationFrame(gameLoop);
        }
    }

    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    function checkCollisions() {
        checkpoints.forEach((checkpoint, index) => {
            if (player.x < checkpoint.x + checkpoint.width &&
                player.x + player.width > checkpoint.x &&
                player.y < checkpoint.y + checkpoint.height &&
                player.y + player.height > checkpoint.y) {
                if (!checkpoint.activated) {
                    checkpoint.activated = true;
                    addStarToTimer(index + 1);
                    if (index === checkpoints.length - 1) {
                        finishGame();
                    }
                }
            }
        });
    }

    function addStarToTimer(index) {
        let starsDiv = document.getElementById('checkpointStars');
        let star = document.createElement('span');
        star.textContent = '⭐';
        starsDiv.appendChild(star);
    }

    function finishGame() {
        clearInterval(timerInterval);
        startConfetti();
        alert('Congratulations! You have defeated the mirage!');
        resetGame(); // Resets the game after finishing
    }

    function startConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function formatTime(ms) {
        let seconds = Math.floor(ms / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
