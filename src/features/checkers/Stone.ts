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

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    const directionLong = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    const isDiagonalMove =
      (target.x === this.cell.x + direction &&
        target.y === this.cell.y + direction &&
        this.cell.board.getCell(target.x, target.y)!.isEmpty()) ||
      (target.x === this.cell.x - direction &&
        target.y === this.cell.y + direction &&
        this.cell.board.getCell(target.x, target.y)!.isEmpty());

        /**
     * const board;
     *
     * const diagonal = [1..10].map( i => board.get(x + i*d, y + i*d) );
     *
     *       0 1 2    -> x
     *      -------
     *  0  | 1 2 3
     *  1  | 4 5 6
     *  2  | 7 8 9
     *
     *  ^
     *  y
     *
     *  \ / - два возможных направления диагонали по X
     *
     *  [0,2]
     *  1: [0 + 1*(1), 2 + 1*(-1) ] = [1. 1] => 5
     *  2: [0 + 2*(1), 2 + 2*(-1) ] = [2, 0] => 3
     *
     *  [5, 3]
     */

    // const isDiagonalMoveLong =
    // (((target.x === this.cell.x + directionLong &&
    //   target.y === this.cell.y + directionLong &&
    //   this.cell.board.getCell(target.x, target.y).isEmpty()) && (target.x === this.cell.x + direction &&
    //     target.y === this.cell.y + direction &&
    //     !this.cell.board.getCell(target.x, target.y).isEmpty()) )) ||
    // (((target.x === this.cell.x - directionLong &&
    //   target.y === this.cell.y + directionLong &&
    //   this.cell.board.getCell(target.x, target.y).isEmpty()) && (target.x === this.cell.x + direction &&
    //     target.y === this.cell.y + direction &&
    //     !this.cell.board.getCell(target.x, target.y).isEmpty())));

    if (isDiagonalMove) {
      return true;
    }

    return false;
  }
}
