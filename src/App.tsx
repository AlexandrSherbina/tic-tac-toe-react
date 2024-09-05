import "./styles.scss";
import BoardComponent from "./BoardComponent/BoardComponent";
import PanelGame from "./PanelGame/PanelGame";
import { useState } from "react";
import BackgroundApp from "./BackgroundApp/BackgroundApp";

type ScoresTypes = {
  X: number;
  O: number;
};

function App() {
  const [firstPlayer, setFirstPlayer] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<number>(firstPlayer);
  const [scores, setScores] = useState<ScoresTypes>({ X: 0, O: 0 });
  const [restart, setRestart] = useState(false);
  const [reset, setReset] = useState(false);
  const [computerPlayer, setComputerPlayer] = useState<boolean>(false);
  return (
    <>
      <div className="container-game">
        <BackgroundApp restart={restart}></BackgroundApp>
        <PanelGame
          scores={scores}
          currentPlayer={currentPlayer}
          restart={restart}
          setRestart={setRestart}
          setReset={setReset}
          setComputerPlayer={setComputerPlayer}
          computerPlayer={computerPlayer}
        ></PanelGame>
        <BoardComponent
          setScores={setScores}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          restart={restart}
          setRestart={setRestart}
          setReset={setReset}
          reset={reset}
          setComputerPlayer={setComputerPlayer}
          computerPlayer={computerPlayer}
        ></BoardComponent>
      </div>
    </>
  );
}

export default App;
