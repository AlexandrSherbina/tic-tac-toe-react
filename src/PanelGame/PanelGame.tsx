import React, { useEffect, useState } from "react";
import "./PanelGame.scss";
import ButtonPanel from "./ButtonPanel/ButtonPanel";
import ScoresPanel from "./ScoresPanel/ScoresPanel";

import GameModeSelector from "./GameModeSelector/GameModeSelector";
import { GameMode } from "game-mode";
import { PlayersType } from "game-players";

const HUMAN_VS_AI = "human-ai";
const HUMAN_VS_HUMAN = "human-human";
const AI_VS_AI = "ai-ai";
interface PanelGameProps {
  players: PlayersType;
  setPlayers: (value: {}) => void;
  currentPlayer: string;
  restart: boolean;
  setRestart: (value: boolean) => void;
  setReset: (value: boolean) => void;
  computerPlayer: boolean;
  setComputerPlayer: (val: boolean) => void;
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
  setRestart,
  setReset,
  computerPlayer,
  setComputerPlayer,
}) => {
  const [mode, setMode] = useState<GameMode["value"]>("human-human");

  const updatePlayersStatus = (
    playerIdsToUpdate: string[],
    isHuman: boolean
  ) => {
    setPlayers((prevPlayers: any[]) => {
      return Object.keys(prevPlayers).reduce((newPlayers, playerId) => {
        const shouldUpdate = playerIdsToUpdate.includes(playerId);
        return {
          ...newPlayers,
          [playerId]: {
            ...players[playerId],
            human: shouldUpdate ? isHuman : players[playerId].human,
            ai: shouldUpdate ? !isHuman : players[playerId].ai,
          },
        };
      }, {} as PlayersType);
    });
  };
  const handleModeChange = (value: string) => {
    if (value === HUMAN_VS_HUMAN) {
      updatePlayersStatus(["X", "O"], true);
      setComputerPlayer(false);
    }
    if (value === HUMAN_VS_AI) {
      updatePlayersStatus(["X"], false);
      updatePlayersStatus(["O"], true);
      setComputerPlayer(true);
    }
    if (value === AI_VS_AI) {
      updatePlayersStatus(["X", "O"], false);
    }
  };

  useEffect(() => {
    computerPlayer ? setMode(HUMAN_VS_AI) : setMode(HUMAN_VS_HUMAN);
  }, [computerPlayer]);
  return (
    <>
      <div className="container-panel-game">
        <h1>Tic-Toc-Toe GAME</h1>
        <ScoresPanel players={players}></ScoresPanel>
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
          Step player: <span>{currentPlayer}</span>
        </div>
      </div>
    </>
  );
};

export default PanelGame;
