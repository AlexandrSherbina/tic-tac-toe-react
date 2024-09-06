import React, { useEffect, useState } from "react";
import "./GameModeSelector.scss";
import useGameMode from "./useGameMode";

const HUMAN_VS_AI = "human-ai";
const HUMAN_VS_HUMAN = "human-human";

type valueTypes = typeof HUMAN_VS_HUMAN | typeof HUMAN_VS_AI;
interface GameMode {
  value: valueTypes;
  label: string;
}

const gameModes: GameMode[] = [
  { value: HUMAN_VS_HUMAN, label: "Human vs. Human" },
  { value: HUMAN_VS_AI, label: "Human vs. AI" },
];

interface GameModeSelectorTypes {
  computerPlayer?: boolean;
  setComputerPlayer: (val: boolean) => void;
}

const GameModeSelector: React.FC<GameModeSelectorTypes> = ({
  setComputerPlayer,
  computerPlayer,
}) => {
  const { selectedMode, handleModeChange } = useGameMode();
  const handleChange = (value: GameMode["value"]) => {
    handleModeChange(value);
    if (value === HUMAN_VS_AI) setComputerPlayer(true);
    if (value === HUMAN_VS_HUMAN) setComputerPlayer(false);
  };

  useEffect(() => {
    computerPlayer
      ? handleModeChange(HUMAN_VS_AI)
      : handleModeChange(HUMAN_VS_HUMAN);
  }, [computerPlayer]);

  return (
    <div className="game-mode-selector">
      {gameModes.map((mode) => (
        <div key={mode.value} className="game-mode-option">
          <input
            type="radio"
            id={mode.value}
            name="gameMode"
            value={mode.value}
            checked={selectedMode === mode.value}
            onChange={(e) => handleChange(e.target.value as GameMode["value"])}
          />
          <label htmlFor={mode.value}>{mode.label}</label>
        </div>
      ))}
    </div>
  );
};

export default GameModeSelector;
