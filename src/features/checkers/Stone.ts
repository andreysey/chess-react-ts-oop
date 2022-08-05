import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Figure, FigureIcon, FigureNames } from "../Figure";

export class Stone extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo =
      color === Colors.BLACK ? FigureIcon.blackStone : FigureIcon.whiteStone;
    this.name = FigureNames.STONE;
  }

  canMove(target: Cell) {
    // if (!super.canMove(target)) {
    //   // console.log(target);
    //   return false;
    // }
    const x = target.x;
    const y = target.y;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    const directionLong = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    const arr = [];

    if (target.board.getCell(x + direction, y + direction)?.isEmpty()) {
      arr.push([x + direction, y + direction]);
    }

    if (target.board.getCell(x - direction, y + direction)?.isEmpty()) {
      arr.push([x - direction, y + direction]);
    }

    // console.log(arr);

    return arr;
  }
}
