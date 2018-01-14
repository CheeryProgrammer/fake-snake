var snake = new Snake(30, 10, 10, 'right');
var cellSize = 15;
var fieldWidth;
var fieldHeight;
var ctx;

function initialize() {
    window.addEventListener('keydown', onKeyDown);

    var canvas = document.getElementById("canvas");
    canvas.addEventListener('click', onMouseClick);

    setInterval(tick, 100);

    fieldWidth = Math.floor(document.documentElement.clientWidth * 0.9 / cellSize);
    canvas.width = fieldWidth * cellSize;
    fieldHeight = Math.floor(document.documentElement.clientHeight * 0.9 / cellSize);
    canvas.height = fieldHeight * cellSize;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#B5C3B4';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    makeFood();
}

function tick() {
    snake.MakeStep();
    handleEating();
    drawSnake(snake);
}

function handleEating() {
    var head = snake.head();
    if (head.x == food.x && head.y == food.y) {
        snake.grow();
        makeFood();
    }
}

function drawSnake() {
    var head = snake.head(fieldWidth, fieldHeight);
    var tail = snake.tail;
    var canvas = document.getElementById("canvas");

    clearPoint(tail.x, tail.y);
    drawPoint(head.x, head.y);
}

function drawPoint(x, y) {
    if (ctx) {
        ctx.fillStyle = '#040304';
        ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
        ctx.fillStyle = '#B5C3B4';
        ctx.fillRect(x * cellSize + 2, y * cellSize + 2, cellSize - 4, cellSize - 4);
        ctx.fillStyle = '#040304';
        ctx.fillRect(x * cellSize + 3, y * cellSize + 3, cellSize - 6, cellSize - 6);
    }
}

function clearPoint(x, y) {
    if (ctx) {
        ctx.fillStyle = '#B5C3B4';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
}

function onKeyDown(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 68:
        case 39:
            snake.direction = "right";
            break;
        case 65:
        case 37:
            snake.direction = "left";
            break;
        case 87:
        case 38:
            snake.direction = "up";
            break;
        case 83:
        case 40:
            snake.direction = "down";
            break;
        default:
            break;
    }
}

function onMouseClick(event) {
    var h = snake.head();
    var xDiff = h.x * cellSize - event.clientX + canvas.offsetLeft;
    var yDiff = h.y * cellSize - event.clientY + canvas.offsetTop;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff <= 0)
            snake.direction = "right";
        else
            snake.direction = "left";
    } else {
        if (yDiff >= 0)
            snake.direction = "up";
        else
            snake.direction = "down";
    }
}

var food = {};

function makeFood() {
    if (!food) {
        clearPoint(food.x, food.y);
    }
    do {
        food.y = Math.floor(Math.random() * fieldHeight);
        food.x = Math.floor(Math.random() * fieldWidth);
    } while (snake.has(food) >= 0)
    drawPoint(food.x, food.y);
}