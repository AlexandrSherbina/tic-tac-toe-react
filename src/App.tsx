import "./styles.scss";
import BoardComponent from "./BoadComponent/BoardComponent";
import PanelGame from "./PanelGame/PanelGame";

function App() {
  return (
    <>
      <div className="container-game">
        <PanelGame></PanelGame>
        <BoardComponent></BoardComponent>
      </div>
    </>
  );
}

export default App;
