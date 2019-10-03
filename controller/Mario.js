import checkCollision from '../utils/Collision.js';
export default class Mario {

    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.maxSpeed = 2;
        this.hSpeed = 0;
        this.vSpeed = 0;
        this.myWidth = 40;

        this.position = {
            x: 0,
            y: 0,
        };
        this.image = document.getElementById('mario');
    }

    moveLeft() {
        this.hSpeed = - this.maxSpeed;
        this.vSpeed = 0;
    }

    moveRight() {
        this.hSpeed = this.maxSpeed;
        this.vSpeed = 0;
    }

    moveDown() {
        this.vSpeed = - this.maxSpeed;
        this.hSpeed = 0;
    }

    moveUp() {
        this.vSpeed = this.maxSpeed;
        this.hSpeed = 0;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.myWidth, this.myWidth);
    }

    update() {

        if (this.position.x < 0) {
            this.position.x = 0;
            this.hSpeed = 0;
            return;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.vSpeed = 0;
            return;

        }

        if (this.position.x > this.gameWidth - this.myWidth) {
            this.position.x = this.gameWidth - this.myWidth;
            this.hSpeed = 0;
            return;
        }
        if (this.position.y > this.gameHeight - this.myWidth) {
            this.position.y = this.gameHeight - this.myWidth;
            this.vSpeed = 0;
            return;
        }

        const isCollided = checkCollision(this.game,this);

        if(isCollided.mashroom){
            this.game.Food.update();
            this.game.point++;
        }

        if(isCollided.poision){
            alert("Points : "+this.game.point);
            this.game.init();
            return;
        }

        this.position.x += this.hSpeed;
        this.position.y += this.vSpeed;
    }

}