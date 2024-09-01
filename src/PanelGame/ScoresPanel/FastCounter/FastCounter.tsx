import { useEffect, useState, useRef, useMemo } from "react";
interface FastCounterProps {
  score: number;
  rank?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FastCounter: React.FC<FastCounterProps> = ({
  score,
  rank = 100,
  delay = 4,
  className,
  style,
}) => {
  const [counterScores, setCounterScores] = useState<number>(score);
  const intervalRef = useRef<number | null>(null);

  const { scoreWithRank, timer } = useMemo(() => {
    const calculatedScoreWithRank = score * rank;
    const calculatedTimer = calculatedScoreWithRank / delay;
    return {
      scoreWithRank: calculatedScoreWithRank,
      timer: calculatedTimer,
    };
  }, [score, rank, delay]);

  useEffect(() => {
    let count = score >= 1 ? (score - 1) * rank : 0;

    const animate = () => {
      if (count === scoreWithRank) {
        if (intervalRef.current !== null) {
          cancelAnimationFrame(intervalRef.current);
        }
        intervalRef.current = null;
        return;
      }
      setCounterScores(++count);
      intervalRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (intervalRef.current !== null) {
        cancelAnimationFrame(intervalRef.current);
      }
    };
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
