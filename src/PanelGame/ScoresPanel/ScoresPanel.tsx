import React from "react";
import "./ScoresPanel.scss";
const ScoresPanel: React.FC = () => {
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
