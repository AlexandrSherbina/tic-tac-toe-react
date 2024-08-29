import "./styles.scss";
import BoardComponent from "./BoadComponent/BoardComponent";
import PanelGame from "./PanelGame/PanelGame";
import { useState } from "react";

interface Scores {
  X: number;
  O: number;
}

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0 });
  const [restart, setRestart] = useState(false);
  return (
    <>
      <div className="container-game">
        <PanelGame
          scores={scores}
          currentPlayer={currentPlayer}
          restart={restart}
          setRestart={setRestart}
        ></PanelGame>
        <BoardComponent
          scores={scores}
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
