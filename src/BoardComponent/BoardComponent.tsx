import React, { useEffect, useState } from "react";
import { Cell } from "../Cell/Cell";
import { createBoard } from "../utils/helpers/createBoard";
import { checkWin } from "../utils/helpers/checkWin";
import Popup from "../Popup/Popup";
import "./BoardComponent.scss";
import playerSign from "../utils/helpers/playerSign";
import { getRandomIntInclusive } from "../utils/getRandomIntInclusive";

const SIZE_GRID = 3;
const CLASS_WINNER = "winner";

interface BoardProps {
  setScores: (value: any) => void;
  restart: boolean;
  setRestart: (value: boolean) => void;
  reset: boolean;
  setReset: (value: boolean) => void;
  currentPlayer: number;
  setCurrentPlayer: (value: number) => void;
  computerPlayer: boolean;
  setComputerPlayer: (val: boolean) => void;
}

interface StepsType {
  [key: string]: any[];
}

const switchPlayer = (currPlayer: number) => (currPlayer === 0 ? 1 : 0);

const BoardComponent: React.FC<BoardProps> = ({
  setScores,
  restart,
  setRestart,
  currentPlayer,
  setCurrentPlayer,
  reset,
  setReset,
  computerPlayer,
  setComputerPlayer,
}) => {
  const customBoard = createBoard(SIZE_GRID, "");
  const [board, setBoard] = useState<string[][]>(customBoard);
  const [strokeCounter, setStrokeCounter] = useState<number>(0);
  const [messageWinner, setMessageWinner] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [blockingWinnerVerification, setBlockingWinnerVerification] =
    useState<boolean>(false);
  const [playerMoves, setPlayerMoves] = useState<StepsType>({ X: [], O: [] });

  const addPlayerMove = (key: string, value: number | string) => {
    setPlayerMoves((prevState) => ({
      ...prevState,
      [key]: [...(prevState[key] || []), value],
    }));
  };

  const addClassToWinnerCell = (arrWinningComb: number[][]) => {
    arrWinningComb.forEach((row) => {
      const [i, j] = row;
      const playFieldCell = document.querySelector(`#cell-${i}-${j}`);
      playFieldCell?.classList.add(CLASS_WINNER);
    });
  };

  const removeWinnerClass = () => {
    const elementsWithWinnerClass = document.querySelectorAll(
      `.${CLASS_WINNER}`
    );
    elementsWithWinnerClass.forEach((element) => {
      element.classList.remove(CLASS_WINNER);
    });
  };

  const addScores = (key: string) => {
    setScores((prevState: { [key: string]: string & number }) => ({
      ...prevState,
      [key]: prevState[key] + (key === "O" || key === "X" ? 1 : 0),
    }));
  };

  function filterEmptyCells(board: string[][]) {
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
        if (col === "") {
          emptyCells.push([i, j]);
        }
      }
    }
    return emptyCells;
  }

  function logicPlayer(row: number, col: number) {
    if (board[row][col] !== "") return;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = playerSign(currentPlayer);
      return newBoard;
    });
    setCurrentPlayer(switchPlayer(currentPlayer));
    setStrokeCounter((prevCount) => ++prevCount);
    addPlayerMove(playerSign(currentPlayer), `cell-${row}-${col}`);
  }

  const AIplayer = () => {
    // AI player
    const signCurrPlayer = playerSign(currentPlayer);
    console.log(`AI player: ${signCurrPlayer} => move`);
    const emptyCells = filterEmptyCells(board);
    if (emptyCells.length === 0) return;
    const aiMove = getRandomIntInclusive(0, emptyCells.length - 1);
    const [row, col] = emptyCells[aiMove];
    logicPlayer(row, col);
  };

  const handleClick = (row: number, col: number) => {
    // Human player
    const signCurrPlayer = playerSign(currentPlayer);
    console.log(`Human player: ${signCurrPlayer} => move`);
    if (signCurrPlayer === "X") return;
    logicPlayer(row, col);
  };

  useEffect(() => {
    const timeout = 500;
    const signCurrPlayer = playerSign(currentPlayer);
    const idTimer = setTimeout(() => {
      if (!blockingWinnerVerification && signCurrPlayer === "X") {
        AIplayer();
      }
    }, timeout);
    return () => clearTimeout(idTimer);
  }, [currentPlayer === 0, blockingWinnerVerification]);

  useEffect(() => {
    const { winningPlayer, winningCombination } = checkWin(board);
    console.log("computerPlayer", computerPlayer);
    if (!blockingWinnerVerification && winningPlayer) {
      addScores(winningPlayer);
      setMessageWinner(`Winner: ${winningPlayer}`);
      setPopupOpen(true);
      addClassToWinnerCell(winningCombination);
      setBlockingWinnerVerification(true);
    }

    if (!winningPlayer && strokeCounter === SIZE_GRID * SIZE_GRID) {
      setMessageWinner("Standoff!");
      setPopupOpen(true);
    }
  }, [board]);

  useEffect(() => {
    if (restart) {
      setCurrentPlayer(switchPlayer(currentPlayer));
      removeWinnerClass();
      setBlockingWinnerVerification(false);
      setBoard(customBoard);
      setRestart(false);
      setStrokeCounter(0);
      setPopupOpen(false);
    }
  }, [restart]);

  useEffect(() => {
    if (reset) {
      setCurrentPlayer(switchPlayer(currentPlayer));
      setBlockingWinnerVerification(false);
      setScores({ X: 0, O: 0 });
      removeWinnerClass();
      setStrokeCounter(0);
      setBoard(customBoard);
      setReset(false);
    }
  }, [reset]);

  return (
    <>
      <div
        className="container-board"
        style={{ gridTemplateColumns: `repeat(${SIZE_GRID}, 0fr)` }}
      >
        {board.map((row, i) =>
          row.map((value, j) => {
            return (
              <Cell
                key={`key-${i}-${j}`}
                id={`${i}-${j}`}
                value={value}
                title={value}
                onClick={() => handleClick(i, j)}
              />
            );
          })
        )}
      </div>
      <Popup openPopup={popupOpen} content={messageWinner} />
    </>
  );
};

export default BoardComponent;
