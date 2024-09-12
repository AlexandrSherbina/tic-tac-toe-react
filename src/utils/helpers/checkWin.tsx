import { winCombinations } from "./winCombinations";

export function checkWin(board: any[][]) {
  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[b[0]][b[1]] === board[c[0]][c[1]] &&
      board[a[0]][a[1]] !== ""
    ) {
      return {
        winningPlayer: board[a[0]][a[1]],
        winningCombination: combination,
      }; // Возвращаем выигрышный символ
    }
  }
  return { winningPlayer: null, winningCombination: [] }; // Никто не выиграл
}

function isBoardFull(board: any[][]) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return false; // Если найдена пустая ячейка, игра не окончена
      }
    }
  }
  return true; // Если циклы завершились, значит, все ячейки заполнены
}
export function winProbabilityCalculation(
  board: any[][],
  player: string,
  computer: string
) {
  function minimax(
    board: any[][],
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean
  ) {
    // Проверяем, есть ли победитель или ничья
    const { winningPlayer: winner } = checkWin(board);
    if (winner !== null) {
      return winner === computer ? 1 : winner === player ? -1 : 0;
    }

    if (isBoardFull(board)) {
      return 0; // Ничья
    }

    let bestMove = -Infinity;
    if (isMaximizing) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = computer;
            let score = minimax(board, depth + 1, alpha, beta, false);
            board[i][j] = "";
            bestMove = Math.max(bestMove, score);
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) break; // Альфа-бета отсечение
          }
        }
      }
    } else {
      // Аналогично для минимизирующего игрока
      let bestMove = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = player; // Ход минимизирующего игрока
            let score = minimax(board, depth + 1, alpha, beta, true);
            board[i][j] = "";
            bestMove = Math.min(bestMove, score);
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) break; // Альфа-бета отсечение
          }
        }
      }
      return bestMove;
    }
    return bestMove;
  }

  function findBestMove(board: string[][]) {
    let bestVal = -Infinity;
    let bestMove: { row: number; col: number } = {
      row: 0,
      col: 0,
    };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = computer;
          let moveVal = minimax(board, 0, -Infinity, Infinity, false);
          board[i][j] = "";
          if (moveVal > bestVal) {
            bestMove.row = i;
            bestMove.col = j;
            bestVal = moveVal;
          }
        }
      }
    }
    return bestMove;
  }

  return findBestMove(board);
}
