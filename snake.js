function Snake(length, headX, headY, direction) {
    this.length = length;

    this.body = [
        { x: headX, y: headY }
    ];

    this.head = function () {
        return this.body[this.body.length - 1]
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
    }

    this.updateTail = function () {
        if (this.length < this.body.length)
            this.tail = this.body.shift();
        else
            this.tail = this.body[0];
    }
}