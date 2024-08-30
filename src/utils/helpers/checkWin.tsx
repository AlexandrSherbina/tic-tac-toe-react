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
