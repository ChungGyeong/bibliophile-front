import React, { useEffect, useRef } from "react";
import BookCardItem from "@/components/bookCard/BookCardItem.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

interface InfinityBookCardProps {
  setPage: (value: React.SetStateAction<number>) => void;
}

const InfinityBookCard: React.FC<InfinityBookCardProps> = ({ setPage }) => {
  const [isScroll, setIsScroll] = React.useState(false);

  const { searchedBookList, loading, hasMoreSearchResult } = useSelector(
    (state: RootState) => state.book
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const handleScroll = () => {
    if (window.scrollY > 100) setIsScroll(true);
    else setIsScroll(false);
  };

  const handleClickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (hasMoreSearchResult && entries[0].isIntersecting && !loading) {
        setPage(prev => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    const currentObserver = observer.current;

    const target = document.querySelector("#load-more");
    if (target) currentObserver.observe(target);

    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      {loading && (
        <div className="w-full">
          <img src="/images/loading.gif" alt="로딩 중..." className="m-auto mt-[50%]" />
        </div>
      )}
      {!loading && !hasMoreSearchResult && (
        <div className="text-center mt-10">더 이상 결과가 없습니다.</div>
      )}
      {isScroll && (
        <i
          className="fi fi-sr-arrow-circle-up text-5xl text-orange fixed bottom-16 z-20 left-[75%]"
          onClick={handleClickToTop}
        ></i>
      )}
      <div id="load-more" className="h-32"></div>
    </div>
  );
};

export default InfinityBookCard;
