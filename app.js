var snake = new Snake(30, 10, 10, 'right');
var cellSize = 15;
var fieldWidth;
var fieldHeight;

function tick() {
    snake.MakeStep();
    drawSnake(snake);
}

function initialize() {
    var canvas = document.getElementById("canvas");
    canvas.addEventListener('click', onMouseClick);
    fieldWidth = Math.floor(document.documentElement.clientWidth * 0.9 / cellSize);
    canvas.width = fieldWidth * cellSize;
    fieldHeight = Math.floor(document.documentElement.clientHeight * 0.9 / cellSize);
    canvas.height = fieldHeight * cellSize;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#B5C3B4';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function drawSnake() {
    var head = snake.head(fieldWidth, fieldHeight);
    var tail = snake.tail;
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#040304';
        ctx.fillRect(head.x * cellSize + 1, head.y * cellSize + 1, cellSize - 2, cellSize - 2);
        ctx.fillStyle = '#B5C3B4';
        ctx.fillRect(head.x * cellSize + 2, head.y * cellSize + 2, cellSize - 4, cellSize - 4)
        ctx.fillRect(tail.x * cellSize, tail.y * cellSize, cellSize, cellSize);;
        ctx.fillStyle = '#040304';
        ctx.fillRect(head.x * cellSize + 3, head.y * cellSize + 3, cellSize - 6, cellSize - 6);
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
        if(xDiff <= 0)
            snake.direction = "right";
        else
            snake.direction = "left";
    }else{
        if(yDiff >= 0)
            snake.direction = "up";
        else
            snake.direction = "down";
    }
}