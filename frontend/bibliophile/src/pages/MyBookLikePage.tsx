import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { loadBookmarkList } from "@/redux/bookmarkSlice";
import BookCardItem from "../components/bookCard/BookCardItem";

const MyBookLikePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bookmarkList = [], loading, error } = useSelector((state: RootState) => state.bookmark);

  useEffect(() => {
    dispatch(loadBookmarkList());
  }, [dispatch]);

  const handleBookmarkToggle = () => {
    dispatch(loadBookmarkList());
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <img src="/images/loading.gif" alt="Loading..." />
      </div>
    );
  }

  if (error) return <div>ERROR: {error}</div>;

  return (
    <div className="mt-[40px]">
      {bookmarkList.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-[5%] gap-y-[20px] w-full">
          {bookmarkList.map((book, idx) => (
            <BookCardItem
              key={idx}
              bookId={book.bookId}
              title={book.title}
              thumbnail={book.thumbnail}
              authors={book.authors}
              isBookmarked={true}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      ) : (
        <div>현재 북마크한 책이 없습니다.</div>
      )}
    </div>
  );
};

export default MyBookLikePage;
