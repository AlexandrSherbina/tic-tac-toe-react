import React from "react";
import "./Cell.scss";

export interface CellProps {
  id: number;
  value: string | number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string | number;
  clicked: boolean;
}

export const Cell: React.FC<CellProps> = ({
  id,
  value,
  onClick,
  clicked = false,
}) => {
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
