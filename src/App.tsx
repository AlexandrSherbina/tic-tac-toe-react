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
  const [players, setPlayers] = useState<PlayersType>({
    O: {
      index: 0,
      playerLetter: "O",
      human: true,
      ai: false,
      scores: 0,
      playerMoves: [],
    },
    X: {
      index: 1,
      playerLetter: "X",
      human: true,
      ai: false,
      scores: 0,
      playerMoves: [],
    },
  });
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    players["X"].playerLetter
  );
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
          players={players}
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
