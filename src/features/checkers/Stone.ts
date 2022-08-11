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

  // getCellsForMovements(): Cell[] {
  //   const dy = this.color === Colors.BLACK ? 1 : -1;
  //   const board = this.cell.board;
  //   const result = [];

  //   const dc = (x, y, [dx, dy]) => ({
  //     cell: board.getCell(x + dx, y + dy),
  //     v: [dx, dy],
  //   });

  //   const q = [
  //     dc(this.cell.x, this.cell.y, [1, dy]),
  //     dc(this.cell.x, this.cell.y, [-1, dy]),
  //   ];

  //   while (q.length > 0) {
  //     let { cell, v } = q.shift();

  //     if (!cell) {
  //       continue;
  //     }

  //     if (cell.isEmpty()) {
  //       result.push(cell);
  //     } else if (cell.color !== this.color) {
  //       q.push(dc(cell.x, cell.y, v as [number, number]));
  //     }
  //   }

  //   return [];
  // }

  /*
   *
   * 1 проверка всех фигур текущего игрока на возможность хода, 
   *    или возможность ударить п2
   *      ход возможен - выделить доступные для хода
   *      передать ход
   *    запушить в обьект фигуры масив с координатами для хода?
   *   
   * 2 если возможно забрать вражескую фигур то выделить только ее (правило бить обязательно)
   *    cell.kill = true?
   *    полсе кила проверка фигуры на кил === true
   *    передать ход п1
   *    
   * 3 фигира становится дамкой по достижению конца доски
   *    может ходить и бить по всем диагоналям
   *    бить если за вражеской фигурой есть свободная ячейка
   * 
   */

  canMove(target: Cell) {
    const x = target.x;
    const y = target.y;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    const directionLong = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    const arr = [];

    if (target.board.getCell(x + direction, y + direction)?.isEmpty()) {
      arr.push([x + direction, y + direction]);
    } else if (
      target.board.getCell(x + direction, y + direction)?.figure?.color !==
        target.figure?.color &&
      target.board.getCell(x + directionLong, y + directionLong)?.isEmpty()
    ) {
      arr.push([x + direction, y + direction]);
      arr.push([x + directionLong, y + directionLong]);
    }

    if (target.board.getCell(x - direction, y + direction)?.isEmpty()) {
      arr.push([x - direction, y + direction]);
    } else if (
      target.board.getCell(x - direction, y + direction)?.figure?.color !==
        target.figure?.color &&
      target.board.getCell(x - directionLong, y + directionLong)?.isEmpty()
    ) {
      arr.push([x - direction, y + direction]);
      arr.push([x - directionLong, y + directionLong]);
    }

    return arr;
  }
}
