import React, { useState } from "react";

interface LikeButtonProps {
  isBookmarked?: boolean;
  bookId: number;
}

// @ts-ignore
const LikeButton: React.FC<LikeButtonProps> = ({ isBookmarked = false, bookmarkId }) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleToggleBookmarked = () => {
    const updateBookmarkedState = !bookmarked;
    // TODO: API 연결 시에 bookmarked 의 T/F 여부에 따라 다르게 API 연결하기
    setBookmarked(updateBookmarkedState);
  };

  return (
    <button onClick={handleToggleBookmarked} className="z-10">
      {bookmarked ? (
        <i className="fi fi-sr-heart text-orange text-base" />
      ) : (
        <i className="fi fi-sr-heart text-soft-gray text-base" />
      )}
    </button>
  );
};

export default LikeButton;
