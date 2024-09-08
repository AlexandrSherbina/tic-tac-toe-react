import React from "react";
import "./ButtonPanel.scss";
interface ButtonPanelProps {
  setRestart: (value: boolean) => void;
  setReset: (value: boolean) => void;
}
const ButtonPanel: React.FC<ButtonPanelProps> = ({ setRestart, setReset }) => {
  const handleRestart = () => setRestart(true);
  const handlerReset = () => setReset(true);
  return (
    <>
      <div className="button-container-game">
        <button onClick={handleRestart} className="btn-game btn-restart-game">
          CONTINUE GAME
        </button>
        <button onClick={handlerReset} className="btn-game btn-reset-game">
          RESTART GAME
        </button>
      </div>
    </>
  );
};

export default ButtonPanel;
