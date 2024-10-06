import React, { useEffect } from "react";
import BookCardItem from "@/components/bookCard/BookCardItem.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

interface InfinityBookCardProps {
  page: number;
  setPage: (value: React.SetStateAction<number>) => void;
  searchString: string;
}

const InfinityBookCard: React.FC<InfinityBookCardProps> = ({ setPage }) => {
  const { searchedBookList, loading } = useSelector((state: RootState) => state.book);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.2,
    });

    const observerTarget = document.getElementById("observer");

    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [searchedBookList]);

  if (loading)
    return (
      <div className="w-full">
        <img src="/images/loading.gif" alt="로딩 중..." className="m-auto mt-[50%]" />
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-[5%] gap-y-[20px] w-full">
        {searchedBookList.map(result => (
          <BookCardItem
            key={result.bookId}
            bookId={result.bookId}
            title={result.title}
            thumbnail={result.thumbnail}
            authors={result.authors}
            isBookmarked={result.isBookmarked}
          />
        ))}
      </div>
      <div id="observer" className="h-2"></div>
    </div>
  );
};

export default InfinityBookCard;
