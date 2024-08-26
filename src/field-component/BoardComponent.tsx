import React, { useEffect, useState } from "react";
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

interface StorageData {
  [key: number]: number[]; // any[] для гибкости, можно заменить на более конкретный тип
}
const BoardComponent: React.FC = () => {
  const [counterClicks, setCounterClicks] = useState<number>(0);
  const [cells, setCells] = useState<number[]>(rangeArray(0, 8));
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [storagePlayers, setStoragePlayers] = useState<StorageData>({});
  const [winner, setWinner] = useState<string>("");

  const [closePopup, setClosePopup] = useState<boolean>(false);

  // const handleClickPopup = () => {}

  const addValueToStorage = (key: number, value: number) => {
    setStoragePlayers((prevState) => ({
      ...prevState,
      [key]: [...(prevState[key] || []), value],
    }));
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.dataset.clicked === "true") return;
    button.textContent = currentPlayer === 0 ? "X" : "O";
    button.dataset.clicked = "true";
    //
    addValueToStorage(currentPlayer, index);

    //
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    setCounterClicks((prevCount) => ++prevCount);
  };

  useEffect(() => {
    const length = cells.length;
    console.log("storagePlayers: ", storagePlayers);
    if (counterClicks === length) {
      setClosePopup(true);
      setWinner("Standoff");
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
    <div className="container-board">
      {closePopup && (
        <span style={styles}>
          {winner}
          <button onClick={() => setClosePopup(!closePopup)}>X</button>
        </span>
      )}

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
