import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { loadBookmarkList } from "@/redux/bookmarkSlice";
import BookCardItem from "../components/bookCard/BookCardItem";
import loadingGif from "/public/images/loading.gif";

const MyBookLikePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bookmarkList = [], loading, error } = useSelector((state: RootState) => state.bookmark);

  useEffect(() => {
    dispatch(loadBookmarkList());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  if (error) return <div>ERROR: {error}</div>;

  return (
    <div className="mt-[40px]">
      <div className="grid grid-cols-2 gap-x-[5%] gap-y-[20px] w-full">
        {bookmarkList.length > 0 ? (
          bookmarkList.map((book, idx) => (
            <BookCardItem
              key={idx}
              bookId={book.bookId}
              title={book.title}
              thumbnail={book.thumbnail}
              authors={book.authors}
              completionReadingTime={book.lastModifyDate}
            />
          ))
        ) : (
          <div>현재 북마크한 책이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyBookLikePage;
