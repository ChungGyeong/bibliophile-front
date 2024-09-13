import React, { useState } from "react";

interface StarScoreProps {
  score?: number;
  onChangeScore?: (score: number) => void;
  mode: "read" | "write";
}

const StarScore: React.FC<StarScoreProps> = ({ score = 0, onChangeScore, mode }) => {
  const [currentScore, setCurrentScore] = useState(score);

  const handleStarClick = (newScore: number) => {
    if (mode === "write" && onChangeScore) {
      setCurrentScore(newScore);
      onChangeScore(newScore);
    }
  };

  return (
    <div className={`flex ${mode === "write" ? "space-x-[10px]" : "space-x-[6px]"}`}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => handleStarClick(star)}
          className={`${currentScore >= star ? "text-orange" : "text-gray"}
          ${mode === "write" ? "text-[30px]" : "text-[16px]"}`}
          disabled={mode === "read"}
        >
          <i className="fi fi-sr-star" />
        </button>
      ))}
    </div>
  );
};

export default StarScore;
