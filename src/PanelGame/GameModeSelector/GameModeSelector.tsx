import React, { useEffect, useState } from "react";
import "./GameModeSelector.scss";

const HUMAN_VS_AI = "human-ai";
const HUMAN_VS_HUMAN = "human-human";

type values = "human-human" | "human-ai";
interface GameMode {
  value: values;
  label: string;
}

const gameModes: GameMode[] = [
  { value: HUMAN_VS_HUMAN, label: "Human vs. Human" },
  { value: HUMAN_VS_AI, label: "Human vs. AI" },
];

interface GameModeSelectorTypes {
  computerPlayer?: boolean;
  setComputerPlayer: (val: boolean) => void;
  gameModes?: [];
}

const GameModeSelector: React.FC<GameModeSelectorTypes> = ({
  computerPlayer,
  setComputerPlayer,
}) => {
  const [selectedMode, setSelectedMode] =
    useState<GameMode["value"]>(HUMAN_VS_HUMAN);

  const handleModeChange = (value: GameMode["value"]) => {
    setSelectedMode(value);
    if (value === HUMAN_VS_AI) {
      setComputerPlayer(true);
    }
    if (value === HUMAN_VS_HUMAN) {
      setComputerPlayer(false);
    }
  };

  useEffect(() => {
    if (computerPlayer) {
      setSelectedMode(HUMAN_VS_AI);
    } else {
      setSelectedMode(HUMAN_VS_HUMAN);
    }
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
