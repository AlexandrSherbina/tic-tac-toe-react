import React, { useEffect, useState } from "react";
import { Cell } from "../Cell/Cell";
import { createBoard } from "../utils/helpers/createBoard";
import { checkWin } from "../utils/helpers/checkWin";
import Popup from "../Popup/Popup";
import "./BoardComponent.scss";
import playerSign from "../utils/helpers/playerSign";

const SIZE_GRID = 3;

interface Scores {
  X: string | number;
  O: string | number;
}
interface BoardProps {
  scores: Scores;
  setScores: (value: any) => void;
  restart: boolean;
  setRestart: (value: boolean) => void;
  currentPlayer: number;
  setCurrentPlayer: (value: number) => void;
}

const BoardComponent: React.FC<BoardProps> = ({
  scores,
  setScores,
  restart,
  setRestart,
  currentPlayer,
  setCurrentPlayer,
}) => {
  const customBoard = createBoard(SIZE_GRID, "");
  const [board, setBoard] = useState<string[][]>(customBoard);
  const [countSteps, setCountSteps] = useState<number>(0);
  const [winner, setWinner] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  //
  const addScore = (key: string) => {
    setScores((prevState: { [key: string]: string & number }) => ({
      ...prevState,
      [key]: prevState[key] + (key === "O" || key === "X" ? 1 : 0),
    }));
  };
  //

  const handleClick = (row: number, col: number) => {
    if (board[row][col] !== "") return;

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = playerSign(currentPlayer);
      return newBoard;
    });

    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    setCountSteps((prevCount) => ++prevCount);
  };

  useEffect(() => {
    const win = checkWin(board);

    if (win) {
      addScore(win);
      setWinner(`Winner: ${win}`);
      setPopupOpen(true);
    }

    if (!win && countSteps === SIZE_GRID * SIZE_GRID) {
      setWinner("Standoff!");
      setPopupOpen(true);
    }
    console.log("scores", scores);
  }, [board, setScores]);

  useEffect(() => {
    if (restart) {
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
      <Popup openPopup={popupOpen} content={winner} />
    </>
  );
};

export default BoardComponent;
