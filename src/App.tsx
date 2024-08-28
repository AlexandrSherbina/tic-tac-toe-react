import "./styles.scss";
import BoardComponent from "./BoadComponent/BoardComponent";
import PanelGame from "./PanelGame/PanelGame";
import { useState } from "react";

function App() {
  const [restart, setRestart] = useState(false);
  return (
    <>
      <div className="container-game">
        <PanelGame restart={restart} setRestart={setRestart}></PanelGame>
        <BoardComponent
          restart={restart}
          setRestart={setRestart}
        ></BoardComponent>
      </div>
    </>
  );
}

export default App;
