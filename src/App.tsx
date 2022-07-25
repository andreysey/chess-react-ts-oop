import { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { FigureIcon } from "./models/figures/Figure";
import { Player } from "./models/Player";

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
          newBoard.addCheckersFigures();
          setBoard(newBoard);
          break;
        case "chess":
          newBoard.addChessFigures();
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
