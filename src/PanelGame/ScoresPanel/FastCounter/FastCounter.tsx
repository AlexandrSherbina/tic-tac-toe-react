import { useEffect, useState } from "react";

interface FastCounterTypes {
  score: number;
}
const FastCounter: React.FC<FastCounterTypes> = ({ score }) => {
  const [counterScores, setCounterScores] = useState<number>(score);
  const fastCounter = (playerScore: number, rankScore: number) => {
    const scoreWithRank = playerScore * rankScore;
    const timer = scoreWithRank / 4;
    let count = playerScore >= 1 ? (playerScore - 1) * rankScore : 0;
    const idClearInt = setInterval(() => {
      if (count === scoreWithRank) return clearInterval(idClearInt);
      setCounterScores(++count);
    }, timer);
  };
  useEffect(() => {
    fastCounter(score, 100);
  }, [score]);
  return <span className="scores-player">{counterScores}</span>;
};

export default FastCounter;
