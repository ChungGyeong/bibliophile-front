import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBookmark, removeBookmark } from "@/redux/bookmarkSlice";
import { loadBookDetailByBookId } from "@/redux/bookSlice";

interface LikeButtonProps {
  isBookmarked: boolean;
  bookId: number;
  onBookmarkToggle?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isBookmarked, bookId, onBookmarkToggle }) => {
  const dispatch: AppDispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleToggleBookmarked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newBookmarkedStatus = !bookmarked;
    setBookmarked(!bookmarked);

    if (newBookmarkedStatus) {
      await dispatch(addBookmark(bookId));
    } else {
      await dispatch(removeBookmark(bookId));
    }
    await dispatch(loadBookDetailByBookId(bookId));

    if (onBookmarkToggle) {
      onBookmarkToggle();
    }
  };

  return (
    <button onClick={handleToggleBookmarked} className="z-10">
      {bookmarked ? (
        <i className="fi fi-sr-heart text-orange " />
      ) : (
        <i className="fi fi-sr-heart text-soft-gray" />
      )}
    </button>
  );
};

export default LikeButton;
