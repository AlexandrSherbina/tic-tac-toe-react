import React, { useEffect, useState } from "react";
import "./ScoresPanel.scss";
import FastCounter from "./FastCounter/FastCounter";
interface ScoresPanelProps {
  scores: { X: number; O: number };
}




const ScoresPanel: React.FC<ScoresPanelProps> = ({ scores }) => {
  return (
    <div className="container-scores-game">
      {Object.entries(scores).map(([player, score], i) => {
        return (
          <div key={`key-${player}-score-${i}`} className="player-game">
            Scores Player {player}:
            <FastCounter
              score={score}
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
