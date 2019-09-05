
import Game from '../controller/game';
import { getCellName, getCellClass } from '../utils/index';


const { EMPTY_CELL } = require("../constants");


/**
 * Scaffolds a board at the given mountNode (DOM reference).
 * 
 * Table with a ID - row_col will be created like below
 * |-----|-----|-----|-----|-----|-----|-----|-----|
 * | 0_0 | 0_1 | 0_2 | ... |     |     |     |     |
 * |-----|-----|-----|-----|-----|-----|-----|-----|
 * | 1_0 | 1_1 | 1_2 | ... |     |     |     |     |
 * |-----|-----|-----|-----|-----|-----|-----|-----|
 * | 2_0 | 2_1 | 2_2 | ... |     |     |     |     |
 * |-----|-----|-----|-----|-----|-----|-----|-----|
 * | ... |     |     | ... |     |     |     |     |
 * |-----|-----|-----|-----|-----|-----|-----|-----|
 * |     |     |     | ... |     |     |     |     |
 * |-----|-----|-----|-----|-----|-----|-----|-----|
 * |     |     |     | ... |     |     |     |     |
 * |-----|-----|-----|-----|-----|-----|-----|-----|
 * |     |     |     | ... |     |     |     |     |
 * |-----|-----|-----|-----|-----|-----|-----|-----|
 * 
 * @param {DOM} mountNode
 * @param {number} cellSize
 */
export default class Board {
  constructor(mountNode, cellSize = 60) {
    // Please don't configure it to anything < 60
    if (cellSize < 60) {
      cellSize = 60;
    }
    this.mountNode = mountNode;
    this.cellSize = cellSize;
    this.render = this.render.bind(this);

    this.init()
  }

  init() {
    const boardRect = this.mountNode.getBoundingClientRect()
    this.noOfCols = Math.floor(boardRect.width / this.cellSize)
    this.noOfRows = Math.floor(boardRect.height / this.cellSize)
    this.game = new Game(this.noOfRows, this.noOfCols, this);

    document.onkeydown = (event) => {
      switch (event.keyCode) {
        case 37:
          this.game.changeDirection('left');
          break;
        case 38:
          this.game.changeDirection('up');
          break;
        case 39:
          this.game.changeDirection('right');
          break;
        case 40:
          this.game.changeDirection('down');
          break;
        case 32:
          this.game.pauseResume();
          break;
      }
    };
  }


  /**
    * Will render the table
    */
  render() {
    this.board = this.game.getBoard();
    const grid = this.getGrid()
    this.mountNode.innerHTML = grid;
  }

  /**
   * @private
   */
  getGrid() {
    return `
    <table>
      <tbody>
        ${Array(this.noOfRows).fill(0).map((_, i) => {
      return `
            <tr style="height: ${this.cellSize}px">
              ${Array(this.noOfCols).fill(EMPTY_CELL).map((_, j) => {
        return `<td id="${getCellName(i, j)}"  class='${getCellClass(this.board[i][j])}' style="height: ${this.cellSize}px; width: ${this.cellSize}px"></td>`
      }).join('')}
            </tr>
          `
    }).join('')}
      </tbody>
    </table>
  `
  }

  getBoardWidth() {
    return this.board[0].length - 1
  }

  getBoardHeight() {
    return this.board.length - 1
  }


}