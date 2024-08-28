export function createBoard(
  size: number,
  fillChar: string = "",
  empty: boolean = true
) {
  const board = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      if (empty) {
        row.push(fillChar); // Случайное заполнение
      } else {
        row.push(Math.random() < 0.5 ? "X" : "O"); // Случайное заполнение
      }
    }
    board.push(row);
  }
  return board;
}
