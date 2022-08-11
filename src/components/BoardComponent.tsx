import React, { useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";
import {FigureIcon} from '../features/Figure';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  currentGame: string;
}

export default function BoardComponent({
  board,
  setBoard,
  currentPlayer,
  currentGame,
  swapPlayer,
}: BoardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = (cell: Cell) => {
    switch (currentGame) {
      case "checkers":
        if (
          selectedCell &&
          selectedCell !== cell &&
          selectedCell.figure?.canMove(cell) &&
          cell.availible &&
          !cell.figure
        ) {
          selectedCell.moveFigure(cell);
          swapPlayer();
          setSelectedCell(null);
        } else {
          if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
          }
        }
        break;
      case "chess":
        if (
          selectedCell &&
          selectedCell !== cell &&
          selectedCell.figure?.canMove(cell) &&
          cell.availible
        ) {
          selectedCell.moveFigure(cell, selectedCell);
          swapPlayer();
          setSelectedCell(null);
        } else {
          if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
          }
        }
        break;
    }
  };

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  return (
    <div>
      <p>Step {currentPlayer?.color === Colors.WHITE ? FigureIcon.whiteStone  : FigureIcon.blackStone}</p>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
