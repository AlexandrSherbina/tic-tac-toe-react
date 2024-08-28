import React, { useEffect, useState } from "react";
import { Cell } from "../Cell/Cell";
import { createBoard } from "../utils/helpers/createBoard";
import { checkWin } from "../utils/helpers/checkWin";
import "./BoardComponent.scss";

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

  interface MyStyles {
    position: "static" | "relative" | "absolute" | "fixed" | "sticky";
    top: string;
    left: string;
    background: string;
    border: string;
    borderRadius: string;
    padding: string;
    fontSize: string;
  }

  const styles: MyStyles = {
    position: "absolute",
    top: "40%",
    left: "50%",
    background: "linear-gradient(45deg, oklch(0.87 0 0), transparent)",
    border: "1px solid black",
    borderRadius: "0.2rem",
    padding: "1rem",
    fontSize: "2rem",
  };
  return (
    <div
      className="container-board"
      style={{ gridTemplateColumns: `repeat(${GRID_BOARD}, 0fr)` }}
    >
      {popupOpen && (
        <span style={styles}>
          {winner}
          <button onClick={() => setPopupOpen(!popupOpen)}>X</button>
        </span>
      )}

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
    </div>
  );
};

export default BoardComponent;
