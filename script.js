const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
let snake;
let food;
let score;
let direction;
let nextDirection;

// Initialize game
function init() {
    snake = [
        { x: 4 * scale, y: 4 * scale },
        { x: 3 * scale, y: 4 * scale },
        { x: 2 * scale, y: 4 * scale },
    ];
    food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
    score = 0;
    direction = 'RIGHT';
    nextDirection = 'RIGHT';
    document.addEventListener('keydown', changeDirection);
    setInterval(update, 100);
}

// Update game state
function update() {
    direction = nextDirection;
    moveSnake();
    if (checkCollision()) {
        //alert('Game Over! Your score: ' + score);
        init();
    }
    if (checkFoodCollision()) {
        score++;
        food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
    } else {
        snake.pop();
    }
    draw();
}

// Move the snake
function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'UP':
            head.y -= scale;
            break;
        case 'DOWN':
            head.y += scale;
            break;
        case 'LEFT':
            head.x -= scale;
            break;
        case 'RIGHT':
            head.x += scale;
            break;
    }
    snake.unshift(head);
}

// Check collision with walls or itself
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

// Check collision with food
function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

// Change direction based on user input
function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (direction !== 'RIGHT') nextDirection = 'LEFT';
            break;
        case 38: // Up arrow
            if (direction !== 'DOWN') nextDirection = 'UP';
            break;
        case 39: // Right arrow
            if (direction !== 'LEFT') nextDirection = 'RIGHT';
            break;
        case 40: // Down arrow
            if (direction !== 'UP') nextDirection = 'DOWN';
            break;
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'green';
    for (let part of snake) {
        ctx.fillRect(part.x, part.y, scale, scale);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);

    // Draw score
    document.getElementById('score').innerText = 'Score: ' + score;
}

// Start the game
init();
