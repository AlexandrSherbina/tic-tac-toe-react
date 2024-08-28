import React, { useEffect, useState } from "react";
import { Cell } from "../Cell/Cell";
import { createBoard } from "../utils/helpers/createBoard";
import { checkWin } from "../utils/helpers/checkWin";
import "./BoardComponent.scss";
import Popup from "../Popup/Popup";

const GRID_BOARD = 3;

const BoardComponent: React.FC = () => {
  const customBoard = createBoard(GRID_BOARD, "");
  const [board, setBoard] = useState(customBoard);
  const [counterClicks, setCounterClicks] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [winner, setWinner] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: number,
    col: number
  ) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.dataset.clicked === "true") return;
    button.dataset.clicked = "true";
    //

    if (board[row][col] !== "") {
      return; // Ячейка уже занята
    }

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = currentPlayer === 0 ? "X" : "O";
      return newBoard;
    });

    //
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    setCounterClicks((prevCount) => ++prevCount);
  };

  useEffect(() => {
    const win = checkWin(board);
    if (win) {
      setWinner(`Winner ${win}`);
      setPopupOpen(true);
    }

    if (win === null && counterClicks === GRID_BOARD * GRID_BOARD) {
      setWinner("Ничья!");
      setPopupOpen(true);
    }
  }, [board]);

  return (
    <div
      className="container-board"
      style={{ gridTemplateColumns: `repeat(${GRID_BOARD}, 0fr)` }}
    >
      {board.map((row, i) =>
        row.map((value, index) => {
          return (
            <Cell
              key={i + index}
              id={i + index}
              value={value}
              title={value}
              clicked={false}
              onClick={(e) => handleClick(e, i, index)}
            />
          );
        })
      )}
      <Popup openPopup={popupOpen} content={winner} />
    </div>
  );
};

export default BoardComponent;
