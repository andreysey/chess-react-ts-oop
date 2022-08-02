import { Board } from "../../models/Board";
import { Colors } from "../../models/Colors";
import { Stone } from "./Stone";

export class DeployCheckersFigure {
    static addWhiteStones(board: Board): void {
    for (let x = 0; x < 8; x++) {
      for (let y = 5; y < 8; y++) {
        if (x % 2 !== 0 && y % 2 === 0) {
          new Stone(Colors.WHITE, board.getCell(x, y)!);
        }
        if (x % 2 === 0 && y % 2 !== 0) {
          new Stone(Colors.WHITE, board.getCell(x, y)!);
        }
      }
    }
  }

  static addBlackStones(board: Board): void {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 3; y++) {
        if (x % 2 !== 0 && y % 2 === 0) {
          new Stone(Colors.BLACK, board.getCell(x, y)!);
        }
        if (x % 2 === 0 && y % 2 !== 0) {
          new Stone(Colors.BLACK, board.getCell(x, y)!);
        }
      }
    }
  }

  static deployFigures(board: Board): void {
    this.addWhiteStones(board);
    this.addBlackStones(board);
  }
    
}
