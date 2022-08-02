import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Figure, FigureIcon, FigureNames } from "../../features/Figure";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo =
      color === Colors.BLACK ? FigureIcon.blackKing : FigureIcon.whiteKing;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const isVerticalMove =
      (target.y === this.cell.y + 1 || target.y === this.cell.y - 1) &&
      target.x === this.cell.x;
    const isHorizontalMove =
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      target.y === this.cell.y;
    const isDiagonalMove =
      (target.x === this.cell.x + 1 && target.y === this.cell.y + 1) ||
      (target.x === this.cell.x - 1 && target.y === this.cell.y - 1) ||
      (target.x === this.cell.x - 1 && target.y === this.cell.y + 1) ||
      (target.x === this.cell.x + 1 && target.y === this.cell.y - 1);

    if (isVerticalMove || isHorizontalMove || isDiagonalMove) {
      return true;
    }
    return false;
  }
}
