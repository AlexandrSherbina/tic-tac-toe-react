import React, { useEffect, useState } from "react";
import "./BoardComponent.scss";

const GRID_BOARD = 3;
interface CellProps {
  id: number;
  value: string | number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string | number;
  clicked: boolean;
}

function createBoard(
  size: number,
  fillChar: string = "",
  empty: boolean = true
) {
  const board = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      if (empty) {
        row.push(fillChar); // Случайное заполнение
      } else {
        row.push(Math.random() < 0.5 ? "X" : "O"); // Случайное заполнение
      }
    }
    board.push(row);
  }
  return board;
}

const winCombinations = [
  // Ряды
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ], // Верхний ряд
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ], // Средний ряд
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ], // Нижний ряд

  // Столбцы
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ], // Левый столбец
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ], // Средний столбец
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ], // Правый столбец

  // Диагонали
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ], // Главная диагональ
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ], // Побочная диагональ
];

function checkWin(board: any[][]) {
  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[b[0]][b[1]] === board[c[0]][c[1]] &&
      board[a[0]][a[1]] !== ""
    ) {
      return board[a[0]][a[1]]; // Возвращаем выигрышный символ
    }
  }
  return null; // Никто не выиграл
}

const Cell: React.FC<CellProps> = ({ id, value, onClick, clicked = false }) => {
  return (
    <button
      className="btn-board-cell"
      id={`cell-${id}`}
      onClick={onClick}
      title={`title-${value}`}
      data-clicked={clicked}
    >
      {value}
    </button>
  );
};

interface StorageData {
  [key: number]: number[]; // any[] для гибкости, можно заменить на более конкретный тип
}

const BoardComponent: React.FC = () => {
  const customBoard = createBoard(GRID_BOARD, "");
  const [board, setBoard] = useState(customBoard);
  const [counterClicks, setCounterClicks] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [storagePlayers, setStoragePlayers] = useState<StorageData>({});
  const [winner, setWinner] = useState<string>("");

  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const addValueToStorage = (key: number, value: number) => {
    setStoragePlayers((prevState) => ({
      ...prevState,
      [key]: [...(prevState[key] || []), value],
    }));
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: number,
    col: number
  ) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.dataset.clicked === "true") return;
    button.textContent = currentPlayer === 0 ? "X" : "O";
    button.dataset.clicked = "true";
    //
    // addValueToStorage(currentPlayer, col);

    if (board[row][col] !== "") {
      return; // Ячейка уже занята
    }

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = currentPlayer === 1 ? "O" : "X";
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
  }, [storagePlayers, counterClicks]);

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
