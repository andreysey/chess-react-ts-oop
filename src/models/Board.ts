import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Stone } from "./figures/Stone";

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

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.availible = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addBishops() {
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
  }

  private addKings() {
    new King(Colors.WHITE, this.getCell(4, 7));
    new King(Colors.BLACK, this.getCell(4, 0));
  }

  private addKnights() {
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.WHITE, this.getCell(6, 7));
    new Knight(Colors.BLACK, this.getCell(6, 0));
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6));
      new Pawn(Colors.BLACK, this.getCell(i, 1));
    }
  }

  private addQueens() {
    new Queen(Colors.WHITE, this.getCell(3, 7));
    new Queen(Colors.BLACK, this.getCell(3, 0));
  }

  private addRooks() {
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.WHITE, this.getCell(7, 7));
    new Rook(Colors.BLACK, this.getCell(7, 0));
  }

  public addChessFigures() {
    this.addBishops();
    this.addKings();
    this.addKnights();
    this.addPawns();
    this.addQueens();
    this.addRooks();
  }

  private addWhiteStones() {
    for (let x = 0; x < 8; x++) {
      for (let y = 5; y < 8; y++) {
        if (x % 2 !== 0 && y % 2 === 0) {
          new Stone(Colors.WHITE, this.getCell(x, y));
        }
        if (x % 2 === 0 && y % 2 !== 0) {
          new Stone(Colors.WHITE, this.getCell(x, y));
        }
      }
    }
  }

  private addBlackStones() {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 3; y++) {
        if (x % 2 !== 0 && y % 2 === 0) {
          new Stone(Colors.BLACK, this.getCell(x, y));
        }
        if (x % 2 === 0 && y % 2 !== 0) {
          new Stone(Colors.BLACK, this.getCell(x, y));
        }
      }
    }
  }

  public addCheckersFigures() {
    this.addWhiteStones();
    this.addBlackStones();
  }
}
