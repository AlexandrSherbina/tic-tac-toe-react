import React from "react";
import "./PanelGame.scss";
import ButtonPanel from "./ButtonPanel/ButtonPanel";
import ScoresPanel from "./ScoresPanel/ScoresPanel";
import playerSign from "../utils/helpers/playerSign";
interface PanelGameProps {
  scores: { X: number; O: number };
  currentPlayer: number;
  restart: boolean;
  setRestart: (value: boolean) => void;
}

const PanelGame: React.FC<PanelGameProps> = ({
  scores,
  currentPlayer,
  setRestart,
}) => {
  return (
    <>
      <div className="container-panel-game">
        <h1>Panel GAME</h1>
        <ScoresPanel scores={scores}></ScoresPanel>
        <ButtonPanel setRestart={setRestart}></ButtonPanel>
        <div className="container-step-players">
          Step player: <span>{playerSign(currentPlayer)}</span>
        </div>
      </div>
    </>
  );
};

export default PanelGame;
