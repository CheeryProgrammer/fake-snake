function Snake(length, headX, headY, direction) {
    this.length = length;

    this.body = [
        { x: headX, y: headY }
    ];

    this.head = function (width, height) {
        var h = this.body[this.body.length - 1];
        if (!width && !height)
            return h;
        if (h.x >= width)
            h.x = 0;
        if (h.x < 0)
            h.x = width;
        if (h.y >= height)
            h.y = 0;
        if (h.y < 0)
            h.y = height;
        return h;
    }

    this.tail = null;

    this.direction = direction;

    this.MakeStep = function () {
        switch (this.direction) {
            case 'right':
                var newHead = this.body[this.body.length - 1];
                this.body.push({ x: newHead.x + 1, y: newHead.y });
                this.updateTail();
                break;
            case 'left':
                var newHead = this.body[this.body.length - 1];
                this.body.push({ x: newHead.x - 1, y: newHead.y });
                this.updateTail();
                break;
            case 'up':
                var newHead = this.body[this.body.length - 1];
                this.body.push({ x: newHead.x, y: newHead.y - 1 });
                this.updateTail();
                break;
            case 'down':
                var newHead = this.body[this.body.length - 1];
                this.body.push({ x: newHead.x, y: newHead.y + 1 });
                this.updateTail();
                break;
            default:
                break;
        }
        var n = this.has(this.head());
        if (n >= 0) {
            this.length -= n + 1;
            while(this.body.length > this.length){
                this.body.shift();
            }
        }
    }

    this.updateTail = function () {
        if (this.length < this.body.length)
            this.tail = this.body.shift();
        else
            this.tail = this.body[0];
    }

    this.grow = function () {
        this.length++;
    }

    this.has = function (point) {
        for (var i = this.body.length - 2; i > 0; i--) {
            if (this.body[i].x === point.x && this.body[i].y === point.y) {
                return i;
            }
        }
        return -1;
    }
}