import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureIcon, FigureNames } from "./Figure";

export class Stone extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo =
      color === Colors.BLACK ? FigureIcon.blackStone : FigureIcon.whiteStone;
    this.name = FigureNames.STONE;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    const directionLong = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    const isDiagonalMove =
      (target.x === this.cell.x + direction &&
        target.y === this.cell.y + direction &&
        this.cell.board.getCell(target.x, target.y).isEmpty()) ||
      (target.x === this.cell.x - direction &&
        target.y === this.cell.y + direction &&
        this.cell.board.getCell(target.x, target.y).isEmpty());

    const isDiagonalMoveLong =
    (((target.x === this.cell.x + directionLong &&
      target.y === this.cell.y + directionLong &&
      this.cell.board.getCell(target.x, target.y).isEmpty()) && (target.x === this.cell.x + direction &&
        target.y === this.cell.y + direction &&
        !this.cell.board.getCell(target.x, target.y).isEmpty()) )) ||
    (((target.x === this.cell.x - directionLong &&
      target.y === this.cell.y + directionLong &&
      this.cell.board.getCell(target.x, target.y).isEmpty()) && (target.x === this.cell.x + direction &&
        target.y === this.cell.y + direction &&
        !this.cell.board.getCell(target.x, target.y).isEmpty())));

    if (isDiagonalMove || isDiagonalMoveLong) {
      return true;
    }

    return false;
  }
}

// const isDiagonalMove =
// (target.x === this.cell.x + direction &&
//   this.cell.board.getCell(target.x, target.y).isEmpty() &&
//   target.y === this.cell.y + direction &&
//   this.cell.board.getCell(target.x, target.y).isEmpty()) ||
// (target.x === this.cell.x - direction &&
//   this.cell.board.getCell(target.x, target.y).isEmpty() &&
//   target.y === this.cell.y + direction &&
//   this.cell.board.getCell(target.x, target.y).isEmpty());
