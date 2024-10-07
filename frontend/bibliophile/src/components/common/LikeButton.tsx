import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBookmark, removeBookmark } from "@/redux/bookmarkSlice";
import { loadBookDetailByBookId } from "@/redux/bookSlice";

interface LikeButtonProps {
  isBookmarked: boolean;
  bookId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isBookmarked, bookId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleToggleBookmarked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    if (bookmarked) {
      await dispatch(removeBookmark(bookId));
    } else {
      await dispatch(addBookmark(bookId));
    }
    await dispatch(loadBookDetailByBookId(bookId));
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
