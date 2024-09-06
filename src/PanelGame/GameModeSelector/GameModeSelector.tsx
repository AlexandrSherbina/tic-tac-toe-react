import React, { useState } from "react";
import "./GameModeSelector.scss";

interface GameMode {
  value: "human-human" | "human-ai";
  label: string;
}

const gameModes: GameMode[] = [
  { value: "human-human", label: "Human vs. Human" },
  { value: "human-ai", label: "Human vs. AI" },
];

interface GameModeSelectorTypes {
  computerPlayer?: boolean;
  setComputerPlayer: (val: boolean) => void;
}

const GameModeSelector: React.FC<GameModeSelectorTypes> = ({
  setComputerPlayer,
}) => {
  const [selectedMode, setSelectedMode] =
    useState<GameMode["value"]>("human-human");

  const handleModeChange = (value: GameMode["value"]) => {
    setSelectedMode(value);
    if (value === "human-ai") {
      setComputerPlayer(true);
    }
    if (value === "human-human") {
      setComputerPlayer(false);
    }
  };

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
            onChange={(e) =>
              handleModeChange(e.target.value as GameMode["value"])
            }
          />
          <label htmlFor={mode.value}>{mode.label}</label>
        </div>
      ))}
    </div>
  );
};

export default GameModeSelector;
