import React, { useState, useCallback, useEffect } from "react";
import "./DifficultySlider.scss";
import { DifficultyType } from "../../types/difficulty";

interface DifficultySliderProps {
  onChange: (difficulty: DifficultyType) => void;
  initialDifficulty?: DifficultyType;
}

const difficultyToValue = {
  low: 16,
  medium: 50,
  hard: 83,
};

const DifficultySlider: React.FC<DifficultySliderProps> = ({
  onChange,
  initialDifficulty = "medium",
}) => {
  const [value, setValue] = useState<number>(
    difficultyToValue[initialDifficulty]
  );

  useEffect(() => {
    setValue(difficultyToValue[initialDifficulty]);
  }, [initialDifficulty]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      setValue(newValue);

      let difficulty: DifficultyType;
      if (newValue <= 33) {
        difficulty = "low";
      } else if (newValue <= 66) {
        difficulty = "medium";
      } else {
        difficulty = "hard";
      }

      onChange(difficulty);
    },
    [onChange]
  );

  const getDifficultyLabel = useCallback((value: number) => {
    if (value <= 33) return "Low";
    if (value <= 66) return "Medium";
    return "Hard";
  }, []);

  return (
    <div className="difficulty-slider">
      <label htmlFor="difficulty-range" className="sr-only">
        Select game difficulty
      </label>
      <input
        id="difficulty-range"
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={handleChange}
        className="slider"
        aria-valuemin={1}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={getDifficultyLabel(value)}
      />
      <div className="difficulty-labels" aria-hidden="true">
        <span className={value <= 33 ? "active" : ""}>Low</span>
        <span className={value > 33 && value <= 66 ? "active" : ""}>
          Medium
        </span>
        <span className={value > 66 ? "active" : ""}>Hard</span>
      </div>
    </div>
  );
};

export default DifficultySlider;
