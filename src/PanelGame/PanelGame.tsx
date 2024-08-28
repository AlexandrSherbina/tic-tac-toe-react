import React from "react";
import "./PanelGame.scss";
import ButtonPanel from "./ButtonPanel/ButtonPanel";
import ScoresPanel from "./ScoresPanel/ScoresPanel";
interface PanelGameProps {
  restart: boolean;
  setRestart: (value: boolean) => void;
}

const PanelGame: React.FC<PanelGameProps> = ({ setRestart }) => {
  return (
    <>
      <div className="container-panel-game">
        <h1>Panel GAME</h1>
        <ScoresPanel></ScoresPanel>
        <ButtonPanel setRestart={setRestart}></ButtonPanel>
        <div className="container-step-players">Step player 1</div>
      </div>
    </>
  );
};

export default PanelGame;
