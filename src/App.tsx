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
 // changes
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

  // const arr = [12, 5, 3, 7, 6, 2, 9, 7];

  // const sum = (arr) => (arr.length == "" ? 0 : arr[0] + sum(arr.slice(1)));
  // // console.log(sum(arr));

  // const recursiveCount = (arr) => {
  //   if (arr == "") return 0;

  //   return 1 + recursiveCount(arr.slice(1));
  // };

  // // console.log(recursiveCount(arr));

  // const recursiveMaxNumber = (arr) => {
  //   if (arr.length === 0) return -Infinity;
  //   if (arr.length === 1) return arr[0];

  //   return Math.max(arr[0], recursiveMaxNumber(arr.slice(1)));
  // };

  // // console.log(recursiveMaxNumber(arr));
  // const quickSortFirst = (arr) => {
  //   if (arr.length < 2) {
  //     return arr;
  //   }

  //   let pivot = arr[0];

  //   let less = [];
  //   let greater = [];

  //   for (let i = 1; i < arr.length; i++) {
  //     arr[i] < pivot ? less.push(arr[i]) : greater.push(arr[i]);
  //   }
  //   return quickSortFirst(less).concat(
  //     pivot,
  //     quickSortFirst(greater)
  //   );
  // };

  // const quickSortRandom = (arr) => {
  //   if (arr.length < 2) return arr;

  //   const pivot = arr[Math.floor(Math.random() * arr.length)];

  //   let left = [],
  //     right = [],
  //     equal = [];

  //   for (let val of arr) {
  //     if (val < pivot) {
  //       left.push(val);
  //     } else if (val > pivot) {
  //       right.push(val);
  //     } else {
  //       equal.push(val);
  //     }
  //   }
  //   return [...quickSortRandom(left), ...equal, ...quickSortRandom(right)];
  // };

  // console.log(quickSortFirst(arr));
  // console.log( quickSortRandom(arr));
  
  // countdown(100);

  // console.log(`index = ${binarySearch(myArray, 170)}`);
  // console.log(Math.log2(9));

  function Menu() {
    return (
      <div className={"menu"}>
        <h2>Chose game</h2>
        <button onClick={() => setCurrentGame("checkers")}>
          Checkers {FigureIcon.blackStone}
        </button>
        <button onClick={() => setCurrentGame("chess")}>
          Chess {FigureIcon.blackKnight}
        </button>
      </div>
    );
  }

  function Game() {
    const [board, setBoard] = useState(new Board(8));
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
      restart();
      setCurrentPlayer(whitePlayer);
    }, []);

    const restart = () => {
      const newBoard = new Board(8);

      switch (currentGame) {
        case "checkers":
          DeployCheckersFigure.deployFigures(newBoard);
          setBoard(newBoard);
          break;
        case "chess":
          const deployChess = new DeployChessFigure();
          deployChess.deployFigures(newBoard);
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
          currentGame={currentGame}
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
