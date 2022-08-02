import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Figure, FigureIcon, FigureNames } from "../Figure";

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo =
      color === Colors.BLACK ? FigureIcon.blackBishop : FigureIcon.whiteBishop;
    this.name = FigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    if(this.cell?.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}
