import React from "react";
import "./ButtonPanel.scss";
interface ButtonPanelProps {
  setRestart: (value: boolean) => void;
  setReset: (value: boolean) => void;
  computerPlayer: boolean;
  setComputerPlayer: (val: boolean) => void;
}
const ButtonPanel: React.FC<ButtonPanelProps> = ({
  setRestart,
  setReset,
  setComputerPlayer,
  computerPlayer,
}) => {
  const handleRestart = () => setRestart(true);
  const handlerReset = () => setReset(true);
  const handlerAIPlayer = () => setComputerPlayer(!computerPlayer);
  return (
    <>
      <div className="button-container-game">
        <button onClick={handleRestart} className="btn-game btn-restart-game">
          CONTINUE GAME
        </button>
        <button onClick={handlerReset} className="btn-game btn-reset-game">
          RESTART GAME
        </button>
        <button
          onClick={handlerAIPlayer}
          className={`btn-game btn-AI-player ${
            computerPlayer ? "choose-ai" : ""
          }`}
        >
          CHOOSE AI PLAYER
        </button>
      </div>
    </>
  );
};

export default ButtonPanel;
