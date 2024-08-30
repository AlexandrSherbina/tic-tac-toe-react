import React, { useEffect, useState } from "react";
import { Cell } from "../Cell/Cell";
import { createBoard } from "../utils/helpers/createBoard";
import { checkWin } from "../utils/helpers/checkWin";
import Popup from "../Popup/Popup";
import "./BoardComponent.scss";
import playerSign from "../utils/helpers/playerSign";

const SIZE_GRID = 3;
const CLASS_WINNER = "winner";

interface BoardProps {
  setScores: (value: any) => void;
  restart: boolean;
  setRestart: (value: boolean) => void;
  currentPlayer: number;
  setCurrentPlayer: (value: number) => void;
}

interface StepsType {
  [key: string]: any[];
}

const BoardComponent: React.FC<BoardProps> = ({
  setScores,
  restart,
  setRestart,
  currentPlayer,
  setCurrentPlayer,
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

  const handleClick = (row: number, col: number) => {
    if (board[row][col] !== "") return;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = playerSign(currentPlayer);
      return newBoard;
    });

    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    setStrokeCounter((prevCount) => ++prevCount);
    addPlayerMove(playerSign(currentPlayer), `cell-${row}-${col}`);
  };

  useEffect(() => {
    const { winningPlayer, winningCombination } = checkWin(board);

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
      removeWinnerClass();
      setBlockingWinnerVerification(false);
      setBoard(customBoard);
      setRestart(false);
      setStrokeCounter(0);
      setPopupOpen(false);
    }
  }, [restart]);

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
