import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loadBookmarkList } from "@/redux/bookmarkSlice";
import BookCardItem from "../components/bookCard/BookCardItem";
import { BookmarkResponse } from "@/types/bookmarks";

const MyBookLikePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [bookmarkList, setBookmarkList] = useState<BookmarkResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const response = await dispatch(loadBookmarkList()).unwrap();
        setBookmarkList(response.data);
      } catch (err) {
        setError("북마크 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
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
