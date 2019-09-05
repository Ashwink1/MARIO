import Mario from './Mario.js';
import Mushroom from './Mushroom.js';
import Poision from './Poision.js';
import InputHandler from '../utils/InputHandler.js';

export default class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.point = 0;
        this.poisions = [];
    }

    init() {
        this.MarioMan = new Mario(this);
        this.Food = new Mushroom(this);
        this.poisions = [];
        for(let i =0; i < 3 ;i++){
            this.poisions.push(new Poision(this))
        }
        new InputHandler(this.MarioMan);
    }

    draw(ctx) {
        this.MarioMan.draw(ctx);
        this.Food.draw(ctx);
        this.poisions.forEach(element => {
            element.draw(ctx);
        });
       
    }

    update() {
        this.MarioMan.update();
    }

}