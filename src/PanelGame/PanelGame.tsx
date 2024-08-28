import React from "react";
import "./PanelGame.scss";
interface PanelGameProps {
  restart: boolean;
  setRestart: (value: boolean) => void;
}

const PanelGame: React.FC<PanelGameProps> = ({ setRestart }) => {
  const handleRestart = () => setRestart(true);

  return (
    <>
      <div className="container-panel-game">
        <h1>Panel GAME</h1>
        <div className="container-scores-game">
          <div className="player-game">
            Scores Player 1:
            <span className="scores-player">0</span>
          </div>
          <div className="player-game">
            Scores Player 2:
            <span className="scores-player">0</span>
          </div>
        </div>
        <div className="button-container-game">
          <button className="btn-game btn-start-game">START GAME</button>
          <button onClick={handleRestart} className="btn-game btn-restart-game">
            RESTART GAME
          </button>
        </div>
        <div className="container-step-players">Step player 1</div>
      </div>
    </>
  );
};

export default PanelGame;
