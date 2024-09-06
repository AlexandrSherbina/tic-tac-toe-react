import React, { useEffect } from "react";
import "./GameModeSelector.scss";
import useGameMode from "./useGameMode";
import { GameMode } from "game-mode";

interface GameModeSelectorProps {
  gameModes: GameMode[];
  initialMode: GameMode["value"];
  mode: GameMode["value"];
  onModeChange: (mode: GameMode["value"]) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  gameModes,
  initialMode,
  mode,
  onModeChange,
}) => {
  const { selectedMode, handleModeChange } = useGameMode(initialMode);

  const handleChange = (value: GameMode["value"]) => {
    handleModeChange(value);
    onModeChange(value);
  };

  useEffect(() => {
    handleModeChange(mode);
  }, [mode]);
  return (
    <div className="game-mode-selector" aria-labelledby="game-mode-label">
      <h2 id="game-mode-label">Select a game mode</h2>
      {gameModes.map((mode) => (
        <div key={mode.value} className="game-mode-option">
          <input
            type="radio"
            id={mode.value}
            name="gameMode"
            disabled={mode.disabled}
            value={mode.value}
            checked={selectedMode === mode.value}
            onChange={(e) => handleChange(e.target.value as GameMode["value"])}
            aria-checked={selectedMode === mode.value ? "true" : "false"}
          />
          <label htmlFor={mode.value}>{mode.label}</label>
        </div>
      ))}
    </div>
  );
};

export default GameModeSelector;
