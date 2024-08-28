import React from "react";
import "./PanelGame.scss";
import ButtonPanel from "./ButtonPanel/ButtonPanel";
interface PanelGameProps {
  restart: boolean;
  setRestart: (value: boolean) => void;
}

const PanelGame: React.FC<PanelGameProps> = ({ setRestart }) => {
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
        <ButtonPanel setRestart={setRestart}></ButtonPanel>
        <div className="container-step-players">Step player 1</div>
      </div>
    </>
  );
};

export default PanelGame;
