import { useEffect, useState, useRef, useMemo } from "react";
import { NodeJS } from "node:process";

type PositiveNumber = number & {
  readonly __brand: unique symbol;
};

type ValidDelayValues = 1 | 2 | 3 | 4 | 5;
interface FastCounterProps {
  score: number;
  rank?: number;
  delay?: ValidDelayValues;
  className?: string;
  style?: React.CSSProperties;
}

const isPositiveNumber = (value: unknown): value is PositiveNumber =>
  typeof value === "number" && value > 0;

const FastCounter: React.FC<FastCounterProps> = ({
  score,
  rank = 100,
  delay = 4,
  className,
  style,
}) => {
  const [counterScores, setCounterScores] = useState<number>(score);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { scoreWithRank, timer } = useMemo(() => {
    const calculatedScoreWithRank = score * rank;
    const calculatedTimer = calculatedScoreWithRank / delay;
    return {
      scoreWithRank: calculatedScoreWithRank,
      timer: calculatedTimer,
    };
  }, [score, rank, delay]);
  useEffect(() => {
    // const scoreWithRank = score * rank;
    // const timer = scoreWithRank / delay;
    let count = score >= 1 ? (score - 1) * rank : 0;

    intervalRef.current = setInterval(() => {
      if (count === scoreWithRank) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCounterScores(++count);
    }, timer);

    return () => clearInterval(intervalRef.current);
  }, [scoreWithRank, timer]);

  return (
    <span
      className={className}
      style={style}
      aria-label={`Counter: ${counterScores}`}
    >
      {counterScores}
    </span>
  );
};

export default FastCounter;
