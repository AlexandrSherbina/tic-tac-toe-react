import "./styles.scss";
import BoardComponent from "./BoardComponent/BoardComponent";
import PanelGame from "./PanelGame/PanelGame";
import { useState } from "react";

type ScoresTypes = {
  X: number;
  O: number;
};

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [scores, setScores] = useState<ScoresTypes>({ X: 0, O: 0 });
  const [restart, setRestart] = useState(false);
  return (
    <>
      <div className="container-game">
        <div className="container-fon-image">
          <div className="glass"></div>
        </div>
        <PanelGame
          scores={scores}
          currentPlayer={currentPlayer}
          restart={restart}
          setRestart={setRestart}
        ></PanelGame>
        <BoardComponent
          setScores={setScores}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          restart={restart}
          setRestart={setRestart}
        ></BoardComponent>
      </div>
    </>
  );
}

export default App;
