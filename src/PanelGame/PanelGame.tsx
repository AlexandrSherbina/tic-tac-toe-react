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
  setReset: (value: boolean) => void;
  computerPlayer: boolean;
  setComputerPlayer: (val: boolean) => void;
}

const PanelGame: React.FC<PanelGameProps> = ({
  scores,
  currentPlayer,
  setRestart,
  setReset,
  computerPlayer,
  setComputerPlayer,
}) => {
  return (
    <>
      <div className="container-panel-game">
        <h1>Tic-Toc-Toe GAME</h1>
        <ScoresPanel scores={scores}></ScoresPanel>
        <ButtonPanel
          setRestart={setRestart}
          setReset={setReset}
          computerPlayer={computerPlayer}
          setComputerPlayer={setComputerPlayer}
        ></ButtonPanel>
        <div className="container-step-players">
          Step player: <span>{playerSign(currentPlayer)}</span>
        </div>
      </div>
    </>
  );
};

export default PanelGame;
