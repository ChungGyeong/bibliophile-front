import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { loadMyBookList } from "@/redux/myBookSlice";
import BookCardReadingItem from "../components/bookCard/BookCardReadingItem";
import loadingGif from "/images/loading.gif";

const MyBookReadingPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bookList = [], loading, error } = useSelector((state: RootState) => state.myBook);

  useEffect(() => {
    dispatch(loadMyBookList({ status: "READING" }));
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
    <div className="mt-[40px] space-y-[20px]">
      {bookList.length > 0 ? (
        bookList.map((book, idx) => (
          <BookCardReadingItem
            key={idx}
            myBookId={book.myBookId}
            thumbnail={book.thumbnail}
            title={book.title}
            authors={book.authors}
            publisher={book.publisher}
            createdDate={book.createdDate}
            readingPage={book.readingPage}
            totalPage={book.totalPage}
            readingPercent={book.readingPercent}
            isActive={false}
          />
        ))
      ) : (
        <div>현재 읽고 있는 책이 없습니다.</div>
      )}
    </div>
  );
};

export default MyBookReadingPage;
