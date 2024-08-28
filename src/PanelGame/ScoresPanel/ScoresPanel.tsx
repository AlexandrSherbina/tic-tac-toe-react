import React from "react";
import "./ScoresPanel.scss";
interface ScoresPanelProps {}
const ScoresPanel: React.FC<ScoresPanelProps> = ({}) => {
  return (
    <div className="container-scores-game">
      <div className="player-game">
        Scores Player 1:
        <span className="scores-player">0</span>
      </div>
      <div className="player-game">
        Scores Player 2:
        <span className="scores-player">0</span>
      </div>
    </div>
  );
};

export default ScoresPanel;
