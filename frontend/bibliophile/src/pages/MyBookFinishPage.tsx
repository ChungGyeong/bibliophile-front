import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { loadMyBookList } from "@/redux/myBookSlice";
import BookCardItem from "../components/bookCard/BookCardItem";
import BookCardGrid from "@/components/bookCard/BookCardGrid.tsx";

const MyBookFinishPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bookList = [], loading, error } = useSelector((state: RootState) => state.myBook);

  useEffect(() => {
    dispatch(loadMyBookList({ status: "READ" }));
  }, [dispatch]);

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
      {bookList.length > 0 ? (
        <BookCardGrid>
          {bookList.map((book, idx) => (
            <BookCardItem
              key={idx}
              bookId={book.myBookId}
              title={book.title}
              thumbnail={book.thumbnail}
              authors={book.authors}
              completionReadingTime={book.completionReadingTime}
            />
          ))}
        </BookCardGrid>
      ) : (
        <div>현재 다 읽은 책이 없습니다.</div>
      )}
    </div>
  );
};

export default MyBookFinishPage;
