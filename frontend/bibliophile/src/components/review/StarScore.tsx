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
    <div className={`flex items-center ${mode === "write" ? "space-x-[10px]" : "space-x-[6px]"}`}>
      {[1, 2, 3, 4, 5].map(star =>
        mode === "read" ? (
          <i
            key={star}
            className={`fi fi-sr-star ${currentScore >= star ? "text-orange" : "text-gray"} flex items-center text-[16px]`}
          />
        ) : (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            className={`${currentScore >= star ? "text-orange" : "text-gray"} flex items-center text-[30px]`}
          >
            <i className="fi fi-sr-star" />
          </button>
        )
      )}
    </div>
  );
};

export default StarScore;
