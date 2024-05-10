document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 800;
    const height = canvas.height = 800;
    const cellSize = 40;
    const grid = [];
    let obstacles = [
        { x: 150, y: 150, width: 20, height: 20, dx: 0, dy: 0.2 }, // Uniform slow vertical movement
        { x: 650, y: 150, width: 20, height: 20, dx: 0, dy: 0.2 }, // Uniform slow vertical movement
        { x: 350, y: 350, width: 20, height: 20, dx: 0.2, dy: 0 }, // Uniform slow horizontal movement
        { x: 450, y: 650, width: 20, height: 20, dx: 0.2, dy: 0 }  // Uniform slow horizontal movement
    ];
    
    let player = { x: 30, y: 30, width: 20, height: 20 }; // Adjust the initial position if needed
    let gameStarted = false;
    let timerInterval;

    initGrid();
    drawMaze();
    setupEventListeners();
    function initGrid() {
        for (let x = 0; x < width / cellSize; x++) {
            grid[x] = [];
            for (let y = 0; y < height / cellSize; y++) {
                grid[x][y] = {
                    x: x,
                    y: y,
                    walls: [true, true, true, true], 
                    visited: false
                };
            }
        }
        carvePassages(0, 0);
    }

    function carvePassages(x, y) {
        grid[x][y].visited = true;
        const directions = shuffle([0, 1, 2, 3]);
        directions.forEach(direction => {
            const nx = x + (direction === 1 ? 1 : direction === 3 ? -1 : 0);
            const ny = y + (direction === 0 ? -1 : direction === 2 ? 1 : 0);
            if (nx >= 0 && nx < width / cellSize && ny >= 0 && ny < height / cellSize && !grid[nx][ny].visited) {
                grid[x][y].walls[direction] = false;
                grid[nx][ny].walls[(direction + 2) % 4] = false;
                carvePassages(nx, ny);
            }
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function drawMaze() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'white';
        for (let x = 0; x < width / cellSize; x++) {
            for (let y = 0; y < height / cellSize; y++) {
                drawCell(x, y);
            }
        }
        drawStartAndEndPoint();
    }
    function drawStartAndEndPoint() {
        ctx.fillStyle = 'green';
        ctx.fillRect(30, 30, cellSize, cellSize); // Draw start point
        ctx.fillStyle = 'red';
        ctx.fillRect(width - cellSize, height - cellSize, cellSize, cellSize); // Draw end point
    }
    function drawCell(x, y) {
        const cell = grid[x][y];
        const xPos = x * cellSize;
        const yPos = y * cellSize;
        ctx.beginPath();
        if (cell.walls[0]) ctx.moveTo(xPos, yPos), ctx.lineTo(xPos + cellSize, yPos);
        if (cell.walls[1]) ctx.moveTo(xPos + cellSize, yPos), ctx.lineTo(xPos + cellSize, yPos + cellSize);
        if (cell.walls[2]) ctx.moveTo(xPos + cellSize, yPos + cellSize), ctx.lineTo(xPos, yPos + cellSize);
        if (cell.walls[3]) ctx.moveTo(xPos, yPos + cellSize), ctx.lineTo(xPos, yPos);
        ctx.stroke();
    }
    function setupEventListeners() {
        canvas.addEventListener('mousemove', function(event) {
            if (!gameStarted) {
                startTimer();
                gameStarted = true;
            }
            const rect = canvas.getBoundingClientRect();
            const targetX = event.clientX - rect.left - player.width / 2;
            const targetY = event.clientY - rect.top - player.height / 2;
        
            // Check if the intended movement is valid
            if (isValidMove(targetX, targetY) && !isCollidingWithObstacle(targetX, targetY)) {
                player.x = targetX;
                player.y = targetY;
                gameLoop();
            }
        });
        function isCollidingWithObstacle(x, y) {
            for (let i = 0; i < obstacles.length; i++) {
                const obstacle = obstacles[i];
                if (x < obstacle.x + obstacle.width &&
                    x + player.width > obstacle.x &&
                    y < obstacle.y + obstacle.height &&
                    y + player.height > obstacle.y) {
                    return true; // Collision detected
                }
            }
            return false; // No collision detected
        }
        function isValidMove(newX, newY) {
            // Calculate grid cell coordinates
            const cellX = Math.floor(newX / cellSize);
            const cellY = Math.floor(newY / cellSize);
        
            // Boundary checks
            if (newX < 0 || newX >= width - player.width || 
                newY < 0 || newY >= height - player.height) {
                return false; // Movement outside canvas boundaries
            }
        
            // Wall checks
            const cell = grid[cellX][cellY];
            if ((newX < cellX * cellSize && cell.walls[3]) || // Left wall
                (newX + player.width > (cellX + 1) * cellSize && cell.walls[1]) || // Right wall
                (newY < cellY * cellSize && cell.walls[0]) || // Top wall
                (newY + player.height > (cellY + 1) * cellSize && cell.walls[2])) { // Bottom wall
                return false; // Movement intersects with wall
            }
        
            return true; // Valid movement
        }
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        drawMaze();
        drawPlayer();
        checkForEndPoint();
        moveObstacles();
        drawObstacles();
        checkCollisions();  // Check for collisions with obstacles.

    }
    function moveObstacles() {
        obstacles.forEach(obstacle => {
            const speed = .1; // Speed in pixels per frame
            const maxSpeed = 0.2; // Maximum delta per frame (adjust as needed)
    
            // Calculate consistent speed regardless of direction
            obstacle.dx = obstacle.dx > 0 ? maxSpeed : -maxSpeed;
            obstacle.dy = obstacle.dy > 0 ? maxSpeed : -maxSpeed;
    
            // Update position
            obstacle.x += obstacle.dx * speed;
            obstacle.y += obstacle.dy * speed;
    
            // Reverse direction on hitting boundaries
            if (obstacle.x <= 0 || obstacle.x + obstacle.width >= width) {
                obstacle.dx = -obstacle.dx; // Reverse horizontal direction
            }
            if (obstacle.y <= 0 || obstacle.y + obstacle.height >= height) {
                obstacle.dy = -obstacle.dy; // Reverse vertical direction
            }
        });
    }
    
    function handleCollision() {
        // Reset player to start position
        resetPlayerPosition();  // Reset player to the starting position.
        showAlert("You hit an obstacle! Starting over...");
    }
    function showAlert(message) {
        alert(message);
    }

    function checkCollisions() {
        // Check for collision with any obstacle
        obstacles.forEach(obstacle => {
            if (player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y) {
                handleCollision();  // Handle collision by resetting player position.
            }
        });
    }
    function initializeObstacles() {
        obstacles = [
            { x: 150, y: 150, width: 20, height: 20, dx: 0, dy: 0.2 }, // Initial position and movement.
            { x: 650, y: 150, width: 20, height: 20, dx: 0, dy: 0.2 },
            { x: 350, y: 350, width: 20, height: 20, dx: 0.2, dy: 0 },
            { x: 450, y: 650, width: 20, height: 20, dx: 0.2, dy: 0 }
        ];
    }

    function drawObstacles() {
        ctx.fillStyle = 'red';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }
    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    function checkForEndPoint() {
        if (player.x >= width - cellSize - player.width && player.y >= height - cellSize - player.height) {
            clearInterval(timerInterval);
            showModal();
            resetPlayerPosition();
            showCelebrationButton()
        }
    }

    function resetPlayerPosition() {
        // Reset player to the starting point
        player.x = 30;  // Set to starting x coordinate.
    player.y = 30;  // Set to starting y coordinate.
    drawPlayer();  // Redraw the player at the start position.
}
    function showModal() {
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
    
        modal.style.display = "block";
        
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
 function resetGame(clearAll) {
    clearInterval(timerInterval); // Stop the timer.
    document.getElementById('timer').textContent = "00:00"; // Reset the timer display.
    gameStarted = false; // Reset the game start flag.

    if (clearAll) {
        let btn = document.getElementById('celebrateButton');
        if (btn) {
            btn.parentNode.removeChild(btn); // Remove the celebrate button if it exists.
        }
    }

    initGrid(); // Reinitialize the grid for the maze.
    initializeObstacles(); // Reinitialize the obstacles to their starting positions.
    player.x = 30; // Reset player to the starting x coordinate.
    player.y = 30; // Reset player to the starting y coordinate.
    drawMaze(); // Redraw the entire maze.
    startTimer(); // Restart the timer.
}

    const restartButton = document.getElementById('restartBtn');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            resetGame(true);
        });
    } else {
        console.error('Restart button not found');
    }
}
    function showCelebrationButton() {
        let container = document.getElementById('buttonContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'buttonContainer';
            document.body.appendChild(container);
        }
        
        // Apply flexbox styles to the container
        container.style.display = 'flex';
        container.style.justifyContent = 'center'; // Centers the button horizontally
        container.style.alignItems = 'center'; // Centers the button vertically if needed
        container.style.height = '100px'; // Ensure the container has height if it's the only element
    
        // Check if the button already exists
        let btn = document.getElementById('celebrateButton');
        if (!btn) {  // Only create the button if it doesn't exist
            btn = document.createElement('button');
            btn.id = 'celebrateButton';
            btn.textContent = 'Celebrate';
            btn.style.backgroundImage = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
            btn.style.color = 'white';
            btn.style.padding = '20px';
            btn.style.fontSize = '24px';
            btn.style.border = 'none';
            btn.style.borderRadius = '10px';
            btn.style.cursor = 'pointer';
            btn.onclick = startConfetti;
            
            container.appendChild(btn);  // Append the button to the flex container
        }
    }

    function startConfetti() {
        confetti({
            particleCount: 1200,
            spread: 600,
            origin: { y: 0.6 }
        });
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            let elapsedTime = Date.now() - startTime;
            document.getElementById('timer').textContent = formatTime(elapsedTime);
        }, 1000);
    }

    function formatTime(ms) {
        let seconds = Math.floor(ms / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds %= 60;
        return `${minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
        
    }
});



document.getElementById('instructionsBtn').addEventListener('click', function() {
    alert("Move your mouse to navigate the maze. Avoid the avoiders and reach the end!");
});

document.getElementById('homeBtn').addEventListener('click', function() {
    window.location.href = 'home.html'; // Ensure this is the correct path
});