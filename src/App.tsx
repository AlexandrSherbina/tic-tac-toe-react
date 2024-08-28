import "./styles.scss";
import BoardComponent from "./BoadComponent/BoardComponent";
import PanelGame from "./PanelGame/PanelGame";
import { useState } from "react";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [restart, setRestart] = useState(false);
  return (
    <>
      <div className="container-game">
        <PanelGame
          currentPlayer={currentPlayer}
          restart={restart}
          setRestart={setRestart}
        ></PanelGame>
        <BoardComponent
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
