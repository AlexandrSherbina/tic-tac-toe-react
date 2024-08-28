import React from "react";
import "./Cell.scss";

export interface CellProps {
  id: number | string;
  value: string | number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string | number;
}

export const Cell: React.FC<CellProps> = ({ id, value, onClick }) => {
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
