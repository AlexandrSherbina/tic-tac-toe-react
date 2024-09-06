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

const GameModeSelector: React.FC = () => {
  const [selectedMode, setSelectedMode] =
    useState<GameMode["value"]>("human-human");

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
              setSelectedMode(e.target.value as GameMode["value"])
            }
          />
          <label htmlFor={mode.value}>{mode.label}</label>
        </div>
      ))}
    </div>
  );
};

export default GameModeSelector;
