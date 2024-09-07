import "./styles.scss";
import BoardComponent from "./BoardComponent/BoardComponent";
import PanelGame from "./PanelGame/PanelGame";
import { useState } from "react";
import BackgroundApp from "./BackgroundApp/BackgroundApp";
import { PlayersType } from "game-players";

type ScoresTypes = {
  X: number;
  O: number;
};

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<string>("O");
  const [scores, setScores] = useState<ScoresTypes>({ X: 0, O: 0 });
  const [restart, setRestart] = useState(false);
  const [reset, setReset] = useState(false);
  const [computerPlayer, setComputerPlayer] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayersType>({
    O: {
      index: 0,
      human: true,
      ai: false,
      scores: 0,
      playerMoves: [],
    },
    X: {
      index: 1,
      human: true,
      ai: false,
      scores: 0,
      playerMoves: [],
    },
  });
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
          players={players}
          setPlayers={setPlayers}
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
