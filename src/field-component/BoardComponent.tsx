import React, { useState } from "react";
import "./BoardComponent.css";
interface CellProps {
  id: number;
  value: string;
  onClick: () => void;
  title: string;
}

const Cell: React.FC<CellProps> = ({ id, value, onClick }) => {
  return (
    <button
      className="btn-board-cell"
      id={`cell-${id}`}
      onClick={onClick}
      title={`title-${value}`}
    >
      {value}
    </button>
  );
};

const BoardComponent: React.FC = () => {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));

  const handleClick = (index: number) => {
    // Логика игры, обновление массива cells
  };

  return (
    <div className="container-board">
      {cells.map((value, index) => (
        <Cell
          key={index}
          id={index}
          value={value}
          title={value}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default BoardComponent;
