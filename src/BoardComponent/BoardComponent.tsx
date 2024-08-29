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
  const [countSteps, setCountSteps] = useState<number>(0);
  const [messageWinner, setMessageWinner] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [blockingWinnerVerification, setBlockingWinnerVerification] =
    useState<boolean>(false);
  const [playerSteps, setPlayerSteps] = useState<StepsType>({ X: [], O: [] });

  const addPlayerSteps = (key: string, value: number | string) => {
    setPlayerSteps((prevState) => ({
      ...prevState,
      [key]: [...(prevState[key] || []), value],
    }));
  };

  const addClassWinnerCell = (arr: string[]) => {
    const lastThreeElem = arr.slice(-3);
    lastThreeElem.forEach((key) => {
      const cell = document.querySelector(`#${key}`);
      cell?.classList.add(CLASS_WINNER);
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
    setCountSteps((prevCount) => ++prevCount);
    // addPlayerSteps(playerSign(currentPlayer), countSteps);
    addPlayerSteps(playerSign(currentPlayer), `cell-${row}-${col}`);
  };

  useEffect(() => {
    const win = checkWin(board);
    if (!blockingWinnerVerification && win) {
      addScores(win);
      setMessageWinner(`Winner: ${win}`);
      setPopupOpen(true);
      addClassWinnerCell(playerSteps[win]);
      setBlockingWinnerVerification(true);
    }

    if (!win && countSteps === SIZE_GRID * SIZE_GRID) {
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
      setCountSteps(0);
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
