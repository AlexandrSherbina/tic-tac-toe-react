export default function rangeArray(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
