import React, { useState } from "react";

interface LikeButtonProps {
  originLiked?: boolean;
  onLikeChange: (liked: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ originLiked = false, onLikeChange }) => {
  const [liked, setLiked] = useState(originLiked);

  const handleToggleLike = () => {
    const updateLikedState = !liked;
    setLiked(updateLikedState);
    onLikeChange(updateLikedState);
  };

  return (
    <button onClick={handleToggleLike}>
      {liked ? (
        <i className="fi fi-sr-heart text-orange text-xl" />
      ) : (
        <i className="fi fi-sr-heart text-soft-gray text-xl" />
      )}
    </button>
  );
};

export default LikeButton;
