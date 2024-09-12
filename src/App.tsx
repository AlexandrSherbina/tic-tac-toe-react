import "./styles.scss";
import BoardComponent from "./BoardComponent/BoardComponent";
import PanelGame from "./PanelGame/PanelGame";
import { useState } from "react";
import BackgroundApp from "./BackgroundApp/BackgroundApp";
import usePlayers from "./hooks/Players.Hook";
import { PlayersType } from "game-players";
import { DifficultyType } from "./types/difficulty";

const initialPlayers: PlayersType = {
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
};

function App() {
  const { players, setPlayers } = usePlayers(initialPlayers);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    players["X"].playerLetter
  );
  const [restart, setRestart] = useState(false);
  const [reset, setReset] = useState(false);
  const [gameDifficulty, setGameDifficulty] =
    useState<DifficultyType>("medium");

  return (
    <>
      <div className="container-game">
        <BackgroundApp restart={restart}></BackgroundApp>
        <PanelGame
          players={players}
          setPlayers={setPlayers}
          currentPlayer={currentPlayer}
          gameDifficulty={gameDifficulty}
          setGameDifficulty={setGameDifficulty}
          restart={restart}
          setRestart={setRestart}
          setReset={setReset}
        ></PanelGame>
        <BoardComponent
          players={players}
          setPlayers={setPlayers}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          gameDifficulty={gameDifficulty}
          restart={restart}
          setRestart={setRestart}
          setReset={setReset}
          reset={reset}
        ></BoardComponent>
      </div>
    </>
  );
}

export default App;
