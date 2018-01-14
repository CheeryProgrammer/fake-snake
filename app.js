var snake = new Snake(3, 10, 10, 'right');
var cellSize = 10;

function tick() {
    snake.MakeStep();
    drawSnake(snake);
}

function drawSnake() {
    var head = snake.head();
    var tail = snake.tail;
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(150, 10, 98)';
        ctx.fillRect(head.x * cellSize, head.y * cellSize, cellSize, cellSize);
        ctx.clearRect(tail.x * cellSize, tail.y * cellSize, cellSize, cellSize);
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