import React, { useEffect, useState } from "react";
import "./PanelGame.scss";
import ButtonPanel from "./ButtonPanel/ButtonPanel";
import ScoresPanel from "./ScoresPanel/ScoresPanel";
import playerSign from "../utils/helpers/playerSign";
import GameModeSelector from "./GameModeSelector/GameModeSelector";

const HUMAN_VS_AI = "human-ai";
const HUMAN_VS_HUMAN = "human-human";
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
  const [mode, setMode] = useState<GameMode["value"]>("human-human");

  const handleModeChange = (value: string) => {
    if (value === HUMAN_VS_AI) setComputerPlayer(true);
    if (value === HUMAN_VS_HUMAN) setComputerPlayer(false);
  };

  useEffect(() => {
    computerPlayer ? setMode(HUMAN_VS_AI) : setMode(HUMAN_VS_HUMAN);
  }, [computerPlayer]);
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
        <GameModeSelector
          gameModes={gameModes}
          initialMode={"human-human"}
          mode={mode}
          onModeChange={handleModeChange}
        />
        <div className="container-step-players">
          Step player: <span>{playerSign(currentPlayer)}</span>
        </div>
      </div>
    </>
  );
};

export default PanelGame;
