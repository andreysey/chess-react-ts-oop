import { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { FigureIcon } from "./features/Figure";
import { Player } from "./models/Player";
import { DeployChessFigure } from "./features/chess/DeployChessFigure";
import { DeployCheckersFigure } from "./features/checkers/DeployCheckersFigure";

// 1 class Board refactor getCell method assert the limits Done?
 /**
   * 2 Переработать логику подстветки и формирования массива клеток
*   доступных для движения.
*
* Фигура должна отвечать за вычесление массива доступных для
*   движения клеток согласно собственным правилам.
*class Board method highlithCells
*/
// 3 refactor class Board methods games out
// 4 add in figure classes array  logic direction
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


export default function App() {
  const [currentGame, setCurrentGame] = useState<string>("");

  function Menu() {
    return (
      <div className={"menu"}>
        <h2>Chose game</h2>
        <button onClick={() => setCurrentGame("checkers")}>
          Checkers {FigureIcon.checkerBoard}
        </button>
        <button onClick={() => setCurrentGame("chess")}>
          Chess {FigureIcon.blackKnight}
        </button>
      </div>
    );
  }

  function Game() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
      restart();
      setCurrentPlayer(whitePlayer);
    }, []);

    const restart = () => {
      const newBoard = new Board();
      newBoard.initCells();
      

      switch (currentGame) {
        case "checkers":
          DeployCheckersFigure.deployFigures(newBoard);
          setBoard(newBoard);
          break;
        case "chess":
          const deployChess = new DeployChessFigure();
          deployChess.deployFigure(newBoard);
          setBoard(newBoard);
         
          break;
      }
    };

    const swapPlayer = () => {
      setCurrentPlayer(
        currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
      );
    };

    return (
      <div className="app">
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
        <div>
          <button onClick={() => setCurrentGame("")}>{"\u21e6"} Back</button>
          <LostFigures
            title={"Black figures"}
            figures={board.lostBlackFigures}
          />
          <LostFigures
            title={"White figures"}
            figures={board.lostWhiteFigures}
          />
        </div>
      </div>
    );
  }

  return currentGame ? <Game /> : <Menu />;
}
