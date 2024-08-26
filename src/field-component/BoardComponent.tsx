import React, { useState } from "react";
import "./BoardComponent.scss";
import rangeArray from "../utils/array-fill";
interface CellProps {
  id: number;
  value: string | number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string | number;
  clicked: boolean;
}

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [6, 4, 2],
];

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

const BoardComponent: React.FC = () => {
  const [cells, setCells] = useState<number[]>(rangeArray(0, 8));
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.dataset.clicked === "true") return;
    button.textContent = currentPlayer === 0 ? "X" : "O";
    button.dataset.clicked = "true";
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  };

  return (
    <div className="container-board">
      {cells.map((value, index) => (
        <Cell
          key={index}
          id={index}
          value={value}
          title={value}
          clicked={false}
          onClick={(e) => handleClick(e, index)}
        />
      ))}
    </div>
  );
};

export default BoardComponent;
