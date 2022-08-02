import { Board } from "../../models/Board";
import { Colors } from "../../models/Colors";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export class DeployChessFigure {
  private addBishops(board: Board) {
    new Bishop(Colors.WHITE, board.getCell(2, 7)!);
    new Bishop(Colors.BLACK, board.getCell(2, 0)!);
    new Bishop(Colors.WHITE, board.getCell(5, 7)!);
    new Bishop(Colors.BLACK, board.getCell(5, 0)!);
  }

  private addKings(board: Board) {
    new King(Colors.WHITE, board.getCell(4, 7)!);
    new King(Colors.BLACK, board.getCell(4, 0)!);
  }

  private addKnights(board: Board) {
    new Knight(Colors.WHITE, board.getCell(1, 7)!);
    new Knight(Colors.BLACK, board.getCell(1, 0)!);
    new Knight(Colors.WHITE, board.getCell(6, 7)!);
    new Knight(Colors.BLACK, board.getCell(6, 0)!);
  }

  private addPawns(board: Board) {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, board.getCell(i, 6)!);
      new Pawn(Colors.BLACK, board.getCell(i, 1)!);
    }
  }

  private addQueens(board: Board) {
    new Queen(Colors.WHITE, board.getCell(3, 7)!);
    new Queen(Colors.BLACK, board.getCell(3, 0)!);
  }

  private addRooks(board: Board) {
    new Rook(Colors.WHITE, board.getCell(0, 7)!);
    new Rook(Colors.BLACK, board.getCell(0, 0)!);
    new Rook(Colors.WHITE, board.getCell(7, 7)!);
    new Rook(Colors.BLACK, board.getCell(7, 0)!);
  }
  public deployFigure(board: Board): void {
    this.addBishops(board);
    this.addKings(board);
    this.addKnights(board);
    this.addPawns(board);
    this.addQueens(board);
    this.addRooks(board);
  }
}
