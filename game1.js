document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;

    let gameStarted = false;
    let timerInterval;
    let player = { x: 20, y: 20, width: 10, height: 10 };
    let endPlatform = { x: 750, y: 750, width: 30, height: 30 };
    let checkpoints = [
        { x: 300, y: 300, width: 30, height: 10, activated: false },
        { x: 550, y: 550, width: 30, height: 10, activated: false },
        { x: 750, y: 750, width: 30, height: 10, activated: false } // End platform as checkpoint
    ];

    canvas.addEventListener('mousemove', function(event) {
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }
        player.x = event.offsetX - player.width / 2;
        player.y = event.offsetY - player.height / 2;
        gameLoop();
    });

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
        drawWalls();
        drawCheckpoints();
        drawEndPlatform();
        drawPlayer();
        checkCollisions();
        if (gameStarted) {
            requestAnimationFrame(gameLoop);
        }
    }

    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawEndPlatform() {
        ctx.fillStyle = 'green';
        ctx.fillRect(endPlatform.x, endPlatform.y, endPlatform.width, endPlatform.height);
    }

    function drawCheckpoints() {
        checkpoints.forEach(checkpoint => {
            ctx.fillStyle = checkpoint.activated ? 'yellow' : 'white';
            ctx.fillRect(checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height);
        });
    }

    function drawWalls() {
        ctx.fillStyle = 'gray';
        ctx.fillRect(50, 50, 700, 10); // Example wall
        // Add more walls as needed
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

    gameLoop(); // Start the game loop
});
