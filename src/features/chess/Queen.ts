import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Figure, FigureIcon, FigureNames } from "../../features/Figure";

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo =
      color === Colors.BLACK ? FigureIcon.blackQueen : FigureIcon.whiteQueen;
    this.name = FigureNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    if (this.cell.isEmptyVertical(target)) return true;

    if (this.cell.isEmptyHorizontal(target)) return true;

    if (this.cell.isEmptyDiagonal(target)) return true;

    return false;
  }
}
