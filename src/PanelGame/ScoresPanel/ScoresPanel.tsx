import React, { useEffect, useState } from "react";
import "./ScoresPanel.scss";
import FastCounter from "./FastCounter/FastCounter";
import { PlayersType } from "game-players";
interface ScoresPanelProps {
  players: PlayersType;
}

const ScoresPanel: React.FC<ScoresPanelProps> = ({ players }) => {
  return (
    <div className="container-scores-game">
      {Object.values(players).map(({ human, playerLetter, scores }, i) => {
        return (
          <div key={`key-${playerLetter}-score-${i}`} className="player-game">
            {human ? "Human" : "AI"} Scores {playerLetter}:
            <FastCounter
              score={scores}
              rank={100}
              delay={4}
              className="scores-player"
            ></FastCounter>
          </div>
        );
      })}
    </div>
  );
};

export default ScoresPanel;
