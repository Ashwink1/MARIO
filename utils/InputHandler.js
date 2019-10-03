export default class InputHandler {
    constructor(MarioMan) {
        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 37:
                    MarioMan.moveLeft();
                    break;
                case 39:
                    MarioMan.moveRight();
                    break;
                case 38:
                    MarioMan.moveDown();
                    break;
                case 40:
                    MarioMan.moveUp();
                    break;
            }
        })
    }
}