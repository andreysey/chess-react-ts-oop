import { Cell } from "../Cell";
import { Colors } from "../Colors";

export enum FigureIcon {
  whiteKing = "\u2654",
  whiteQueen = "\u2655",
  whiteRook = "\u2656",
  whiteBishop = "\u2657",
  whiteKnight = "\u2658",
  whitePawn = "\u2659",
  blackKing = "\u265A",
  blackQueen = "\u265B",
  blackRook = "\u265C",
  blackBishop = "\u265D",
  blackKnight = "\u265E",
  blackPawn = "\u265F",
}

export enum FigureNames {
  FIGURE = "Figure",
  KING = "King",
  QUEEN = "Queen",
  ROOK = "Rook",
  BISHOP = "Bishop",
  KNIGHT = "Knight",
  PAWN = "Pawn",
}

export class Figure {
  color: Colors;
  logo: FigureIcon | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false;

    if (target.figure?.name === FigureNames.KING) return false;

    return true;
  }

  moveFigure(target: Cell) {}
}
