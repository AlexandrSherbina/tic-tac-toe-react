import React, { useState } from "react";
import "./PanelGame.scss";
import ButtonPanel from "./ButtonPanel/ButtonPanel";
import ScoresPanel from "./ScoresPanel/ScoresPanel";

import GameModeSelector from "./GameModeSelector/GameModeSelector";
import { GameMode } from "game-mode";
import { PlayersType } from "game-players";
import {
  updatePlayer,
  updateSelectedPlayers,
} from "../utils/helpers/playerUpdate";
import DifficultySlider from "./DifficultySlider/DifficultySlider";
import { DifficultyType } from "../types/difficulty";

const HUMAN_VS_AI = "human-ai";
const HUMAN_VS_HUMAN = "human-human";
const AI_VS_AI = "ai-ai";

interface PanelGameProps {
  players: PlayersType;
  setPlayers: (value: {}) => void;
  currentPlayer: string;
  gameDifficulty: DifficultyType;
  setGameDifficulty: (difficulty: DifficultyType) => void;
  restart: boolean;
  setRestart: (value: boolean) => void;
  setReset: (value: boolean) => void;
}

const gameModes: GameMode[] = [
  { value: "human-human", label: "Human vs. Human", disabled: false },
  { value: "human-ai", label: "Human vs. AI", disabled: false },
  { value: "ai-ai", label: "AI vs AI", disabled: false },
];

const PanelGame: React.FC<PanelGameProps> = ({
  players,
  setPlayers,
  currentPlayer,
  gameDifficulty,
  setGameDifficulty,
  setRestart,
  setReset,
}) => {
  const [mode, setMode] = useState<GameMode["value"]>("human-human");

  const switchPlayersStatus = (
    playerIdsToUpdate: string[],
    isHuman: boolean
  ) => {
    updateSelectedPlayers(setPlayers, playerIdsToUpdate, {
      human: isHuman,
      ai: !isHuman,
    });
  };

  const switchOnePlayersStatus = (playerId: "O" | "X", isHuman: boolean) => {
    updatePlayer(setPlayers, playerId, {
      human: isHuman,
      ai: !isHuman,
    });
  };

  const playersStatusUpdate = (statusPlayer: string) => {
    switch (statusPlayer) {
      case HUMAN_VS_HUMAN:
        console.log("HUMAN_VS_HUMAN", HUMAN_VS_HUMAN);
        switchPlayersStatus(["X", "O"], true);
        break;
      case HUMAN_VS_AI:
        console.log("HUMAN_VS_AI", HUMAN_VS_AI);
        switchOnePlayersStatus("X", false);
        switchOnePlayersStatus("O", true);
        break;
      case AI_VS_AI:
        console.log("AI_VS_AI", AI_VS_AI);
        switchPlayersStatus(["X", "O"], false);
        break;
      default:
        console.log(`Status Player : ${statusPlayer} d'ont find `);
        break;
    }
  };
  const handleModeChange = (status: string) => {
    playersStatusUpdate(status);
  };

  const handleDifficultyChange = (difficulty: DifficultyType) => {
    console.log("New difficulty:", difficulty);
    // Здесь вы можете обновить состояние вашей игры или выполнить другие необходимые действия
    setGameDifficulty(difficulty);
  };

  return (
    <>
      <div className="container-panel-game">
        <h1>Tic-Tac-Toe GAME</h1>
        <ScoresPanel players={players}></ScoresPanel>
        <ButtonPanel setRestart={setRestart} setReset={setReset}></ButtonPanel>
        <div className="tools-container">
          <DifficultySlider
            onChange={handleDifficultyChange}
            initialDifficulty={gameDifficulty}
          />
          <GameModeSelector
            gameModes={gameModes}
            initialMode={"human-human"}
            mode={mode}
            onModeChange={handleModeChange}
          />
        </div>
        <div className="container-step-players">
          Player move: <span>{currentPlayer}</span>
        </div>
      </div>
    </>
  );
};

export default PanelGame;
