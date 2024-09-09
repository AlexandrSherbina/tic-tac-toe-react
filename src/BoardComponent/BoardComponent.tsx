import React, { useEffect, useState } from "react";
import { Cell } from "../Cell/Cell";
import { createBoard } from "../utils/helpers/createBoard";
import { checkWin } from "../utils/helpers/checkWin";
import Popup from "../Popup/Popup";
import "./BoardComponent.scss";
import { getRandomIntInclusive } from "../utils/getRandomIntInclusive";
import { PlayersType } from "game-players";
import {
  switchPlayer,
  updateSelectedPlayers,
} from "../utils/helpers/playerUpdate";

const SIZE_GRID = 3;
const CLASS_WINNER = "winner";

interface BoardProps {
  players: PlayersType;
  setPlayers: (value: {}) => void;
  restart: boolean;
  setRestart: (value: boolean) => void;
  reset: boolean;
  setReset: (value: boolean) => void;
  currentPlayer: string;
  setCurrentPlayer: (value: string) => void;
}

const BoardComponent: React.FC<BoardProps> = ({
  players,
  setPlayers,
  restart,
  setRestart,
  currentPlayer,
  setCurrentPlayer,
  reset,
  setReset,
}) => {
  const customBoard = createBoard(SIZE_GRID, "");
  const [board, setBoard] = useState<string[][]>(customBoard);
  const [strokeCounter, setStrokeCounter] = useState<number>(0);
  const [messageWinner, setMessageWinner] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [blockingWinnerVerification, setBlockingWinnerVerification] =
    useState<boolean>(false);

  const addPlayerMove = (playerId: string, move: number[]) => {
    // new player move
    setPlayers((prevPlayers: { [x: string]: any }) => ({
      ...prevPlayers,
      [playerId]: {
        ...prevPlayers[playerId],
        playerMoves: [...(prevPlayers[playerId].playerMoves || []), move],
      },
    }));
  };

  const addClassToWinnerCell = (arrWinningComb: number[][]) => {
    arrWinningComb.forEach((row) => {
      const [i, j] = row;
      const playFieldCell = document.querySelector(`#cell-${i}-${j}`);
      playFieldCell?.classList.add(CLASS_WINNER);
    });
  };

  const removeWinnerClass = () => {
    const elementsWithWinnerClass = document.querySelectorAll(
      `.${CLASS_WINNER}`
    );
    elementsWithWinnerClass.forEach((element) => {
      element.classList.remove(CLASS_WINNER);
    });
  };

  // New Scores
  const updatePlayerScores = (playerId: "X" | "O") => {
    setPlayers((prevPlayers: { [x: string]: { scores: number } }) => ({
      ...prevPlayers,
      [playerId]: {
        ...prevPlayers[playerId],
        scores: prevPlayers[playerId].scores + 1,
      },
    }));
  };

  const resetPlayersScores = (playersId: string[], scores: number) => {
    updateSelectedPlayers(setPlayers, playersId, { scores });
  };

  function filterEmptyCells(board: string[][]) {
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
        if (col === "") {
          emptyCells.push([i, j]);
        }
      }
    }
    return emptyCells;
  }

  function logicPlayer(row: number, col: number) {
    if (board[row][col] !== "") return;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = currentPlayer;
      return newBoard;
    });
    setCurrentPlayer(switchPlayer(currentPlayer));
    setStrokeCounter((prevCount) => ++prevCount);
    addPlayerMove(currentPlayer, [row, col]);
  }

  const AIplayer = () => {
    // AI player
    console.log(`AI player: ${currentPlayer} => move`);
    const emptyCells = filterEmptyCells(board);
    if (emptyCells.length === 0) return;
    const aiMove = getRandomIntInclusive(0, emptyCells.length - 1);
    const [row, col] = emptyCells[aiMove];
    logicPlayer(row, col);
  };

  const handleClick = (row: number, col: number) => {
    // Human player
    console.log(`Human player: ${currentPlayer} => move`);
    if (players[currentPlayer].ai) return;
    logicPlayer(row, col);
  };

  useEffect(() => {
    if (players[currentPlayer].human) return;
    if (blockingWinnerVerification) return;
    const timeout = 800;

    const idTimer = setTimeout(() => {
      AIplayer();
    }, timeout);
    return () => clearTimeout(idTimer);
  }, [players, currentPlayer, blockingWinnerVerification]);

  useEffect(() => {
    const { winningPlayer, winningCombination } = checkWin(board);
    if (!blockingWinnerVerification && winningPlayer) {
      updatePlayerScores(winningPlayer);
      setMessageWinner(`Winner: ${winningPlayer}`);
      setPopupOpen(true);
      addClassToWinnerCell(winningCombination);
      setBlockingWinnerVerification(true);
    }

    if (!winningPlayer && strokeCounter === SIZE_GRID * SIZE_GRID) {
      setMessageWinner("Standoff!");
      setPopupOpen(true);
    }
    console.log("players: ", players);
    console.log("playersX: ", players["X"].human);
    console.log("playersO: ", players["O"].human);
  }, [board]);

  useEffect(() => {
    if (restart) {
      setPopupOpen(false);
      setCurrentPlayer(switchPlayer(currentPlayer));
      removeWinnerClass();
      setBlockingWinnerVerification(false);
      setBoard(customBoard);
      setRestart(false);
      setStrokeCounter(0);
    }
  }, [restart]);

  useEffect(() => {
    if (reset) {
      resetPlayersScores(["X", "O"], 0);
      setPopupOpen(false);
      setCurrentPlayer(switchPlayer(currentPlayer));
      setBlockingWinnerVerification(false);
      removeWinnerClass();
      setStrokeCounter(0);
      setBoard(customBoard);
      setReset(false);
    }
  }, [reset]);

  return (
    <>
      <div
        className="container-board"
        style={{ gridTemplateColumns: `repeat(${SIZE_GRID}, 0fr)` }}
      >
        {board.map((row, i) =>
          row.map((value, j) => {
            return (
              <Cell
                key={`key-${i}-${j}`}
                id={`${i}-${j}`}
                value={value}
                title={value}
                onClick={() => handleClick(i, j)}
              />
            );
          })
        )}
      </div>
      <Popup openPopup={popupOpen} content={messageWinner} />
    </>
  );
};

export default BoardComponent;
