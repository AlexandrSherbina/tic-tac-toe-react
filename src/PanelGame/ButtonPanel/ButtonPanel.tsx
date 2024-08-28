import React from "react";
import "./ButtonPanel.scss";
interface ButtonPanelProps {
  setRestart: (value: boolean) => void;
}
const ButtonPanel: React.FC<ButtonPanelProps> = ({ setRestart }) => {
  const handleRestart = () => setRestart(true);
  return (
    <>
      <div className="button-container-game">
        <button onClick={handleRestart} className="btn-game btn-restart-game">
          RESTART GAME
        </button>
      </div>
    </>
  );
};

export default ButtonPanel;
