import React from "react";
import "./ScoresPanel.scss";
interface ScoresPanelProps {
  scores: { X: number; O: number };
}
const ScoresPanel: React.FC<ScoresPanelProps> = ({ scores }) => {
  return (
    <div className="container-scores-game">
      {Object.entries(scores).map(([player, score], i) => (
        <div key={`key-${player}-score-${i}`} className="player-game">
          Scores Player {player}:
          <span className="scores-player">{score * 100}</span>
        </div>
      ))}
    </div>
  );
};

export default ScoresPanel;
