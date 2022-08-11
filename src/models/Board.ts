import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Figure } from "../features/Figure";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  constructor(private readonly boardSize: number) {
    this.initCells();
  }

  public initCells() {
    let id = 1;
    for (let i = 0; i < this.boardSize; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.boardSize; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null, id)); // Black cell
          id++;
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null, id)); // White cell
          id++;
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board(this.boardSize);
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
   *
   * Done?
   */

  public highlightCells(selectedCell: Cell | null) {
    for (let cell of this.cells) {
      for (let el of cell) {
        el.availible = false;
      }
    }
    
    const moveArrays = selectedCell?.figure?.canMove(selectedCell);
    if (moveArrays) {
      for (let i = 0; i < moveArrays.length; i++) {
        this.getCell(moveArrays[i][0], moveArrays[i][1])!.availible = true;
      }
    }
  }

  public getCell(x: number, y: number): Cell | null {
    // todo: assert the limits
    // Done?
    if (x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize) {
      return this.cells[y][x];
    } else {
      return null;
    }
  }
}
