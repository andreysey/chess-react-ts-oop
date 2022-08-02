import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Figure } from "../features/Figure";
import { Stone } from "../features/checkers/Stone";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // Black cell
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // White cell
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  /**
   * Переработать логику подстветки и формирования массива клеток
   *   доступных для движения.
   *
   * Фигура должна отвечать за вычесление массива доступных для
   *   движения клеток согласно собственным правилам.
   */

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.availible = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number): Cell | null {
    // todo: assert the limits
    // Done?
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      return this.cells[y][x];
    } else {
      return null;
    }
  }

}
