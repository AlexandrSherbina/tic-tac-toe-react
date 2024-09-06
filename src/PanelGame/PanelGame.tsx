import React from "react";
import "./PanelGame.scss";
import ButtonPanel from "./ButtonPanel/ButtonPanel";
import ScoresPanel from "./ScoresPanel/ScoresPanel";
import playerSign from "../utils/helpers/playerSign";
import GameModeSelector from "./GameModeSelector/GameModeSelector";
interface PanelGameProps {
  scores: { X: number; O: number };
  currentPlayer: number;
  restart: boolean;
  setRestart: (value: boolean) => void;
  setReset: (value: boolean) => void;
  computerPlayer: boolean;
  setComputerPlayer: (val: boolean) => void;
}

interface GameMode {
  value: string;
  label: string;
}
const gameModes: GameMode[] = [
  { value: "human-human", label: "Human vs. Human" },
  { value: "human-ai", label: "Human vs. AI" },
  { value: "ai-ai", label: "AI vs AI" },
];

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
        <GameModeSelector gameModes={gameModes} initialMode="human-human" />
        <div className="container-step-players">
          Step player: <span>{playerSign(currentPlayer)}</span>
        </div>
      </div>
    </>
  );
};

export default PanelGame;
