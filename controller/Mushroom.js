function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

export default class Mushroom {

    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.myWidth = 40;
        this.image = document.getElementById('mushroom');
        this.position = {
            x: getRandomInRange(this.myWidth, this.gameWidth - this.myWidth, 0),
            y: getRandomInRange(this.myWidth, this.gameHeight - this.myWidth, 0)
        };
        this.generateXandY = this.generateXandY.bind(this);
    }

    generateXandY() {
        const x = getRandomInRange(this.myWidth, this.gameWidth - this.myWidth, 0);
        const y = getRandomInRange(this.myWidth, this.gameHeight - this.myWidth, 0);
        let pos = {
            x: x, y: y
        };
        if (pos.x === this.position.x || pos.y === this.position.y) {
            pos = this.generateXandY();
        };

        return pos;
    }

draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.myWidth, this.myWidth);
}

update() {

    let pos = this.generateXandY();

    this.position = {
        x: pos.x,
        y: pos.y
    };
}

}