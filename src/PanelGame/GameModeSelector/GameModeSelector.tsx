import React, { useEffect, useState } from "react";
import "./GameModeSelector.scss";
import useGameMode from "./useGameMode";

const HUMAN_VS_AI = "human-ai";
const HUMAN_VS_HUMAN = "human-human";

interface GameMode {
  value: string;
  label: string;
}

interface GameModeSelectorProps {
  gameModes: GameMode[];
  initialMode: GameMode["value"];
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  gameModes,
  initialMode,
}) => {
  const { selectedMode, handleModeChange } = useGameMode(initialMode);
  // const handleChange = (value: GameMode["value"]) => {
  //   handleModeChange(value);
  //   if (value === HUMAN_VS_AI) setComputerPlayer(true);
  //   if (value === HUMAN_VS_HUMAN) setComputerPlayer(false);
  // };

  // useEffect(() => {
  //   computerPlayer
  //     ? handleModeChange(HUMAN_VS_AI)
  //     : handleModeChange(HUMAN_VS_HUMAN);
  // }, [computerPlayer]);

  return (
    <div className="game-mode-selector" aria-labelledby="game-mode-label">
      <h2 id="game-mode-label">Select a game mode</h2>
      {gameModes.map((mode) => (
        <div key={mode.value} className="game-mode-option">
          <input
            type="radio"
            id={mode.value}
            name="gameMode"
            value={mode.value}
            checked={selectedMode === mode.value}
            onChange={(e) =>
              handleModeChange(e.target.value as GameMode["value"])
            }
            aria-checked={selectedMode === mode.value ? "true" : "false"}
          />
          <label htmlFor={mode.value}>{mode.label}</label>
        </div>
      ))}
    </div>
  );
};

export default GameModeSelector;
