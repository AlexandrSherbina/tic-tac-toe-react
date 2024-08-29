import React from "react";
import "./ScoresPanel.scss";
interface ScoresPanelProps {
  scores: { X: number; O: number };
}
const ScoresPanel: React.FC<ScoresPanelProps> = ({ scores }) => {
  return (
    <div className="container-scores-game">
      <div className="player-game">
        Scores Player 1:
        <span className="scores-player">{scores.X}</span>
      </div>
      <div className="player-game">
        Scores Player 2:
        <span className="scores-player">{scores.O}</span>
      </div>
    </div>
  );
};

export default ScoresPanel;
