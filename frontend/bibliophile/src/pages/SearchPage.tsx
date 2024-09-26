import React from "react";
import SearchBox from "@/components/common/SearchBox.tsx";
import BookCardItem from "@/components/bookCard/BookCardItem.tsx";
import BookCardGrid from "@/components/bookCard/BookCardGrid.tsx";

// const results: SearchResponse[] = [
//   {
//     bookId: 1,
//     contents: "여우의 생태와 행동에 대한 깊이 있는 탐구.",
//     isbn: "978-3-16-148410-0",
//     kdc: "599.7",
//     title: "여우의 세계",
//     authors: "이수진",
//     page_number: "250",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH8_A9NSLLyKQkvehUSDH4pltCjkHgPy0s2w&s",
//     publisher: "자연 출판사",
//     isBookmarked: true,
//     readingStatus: "READING",
//   },
//   {
//     bookId: 2,
//     contents: "여우와 인간의 관계를 다룬 흥미로운 이야기.",
//     isbn: "978-1-23-456789-7",
//     kdc: "599.8",
//     title: "여우와의 동행",
//     authors: "김철수",
//     page_number: "300",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH8_A9NSLLyKQkvehUSDH4pltCjkHgPy0s2w&s",
//     publisher: "동물 이야기",
//     isBookmarked: false,
//     readingStatus: "UNREAD",
//   },
//   {
//     bookId: 3,
//     contents: "여우의 다양한 종류와 특징을 소개하는 책.",
//     isbn: "978-0-12-345678-9",
//     kdc: "599.7",
//     title: "여우의 종류",
//     authors: "박영희",
//     page_number: "180",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH8_A9NSLLyKQkvehUSDH4pltCjkHgPy0s2w&s",
//     publisher: "생태 출판사",
//     isBookmarked: true,
//     readingStatus: "READ",
//   },
//   {
//     bookId: 4,
//     contents: "여우에 대한 전통과 문화적 의미를 탐구.",
//     isbn: "978-0-14-044913-6",
//     kdc: "398.2",
//     title: "여우와 전설",
//     authors: "최민호",
//     page_number: "220",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH8_A9NSLLyKQkvehUSDH4pltCjkHgPy0s2w&s",
//     publisher: "문화 출판사",
//     isBookmarked: false,
//     readingStatus: "UNREAD",
//   },
//   {
//     bookId: 5,
//     contents: "여우를 주제로 한 아름다운 그림책.",
//     isbn: "978-1-40-289462-3",
//     kdc: "741.5",
//     title: "여우의 꿈",
//     authors: "정하늘",
//     page_number: "60",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH8_A9NSLLyKQkvehUSDH4pltCjkHgPy0s2w&s",
//     publisher: "아트 출판사",
//     isBookmarked: true,
//     readingStatus: "READING",
//   },
//   {
//     bookId: 6,
//     contents: "여우의 보호와 보존에 대한 이야기.",
//     isbn: "978-3-16-148410-1",
//     kdc: "333.95",
//     title: "여우를 지켜요",
//     authors: "이민수",
//     page_number: "150",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH8_A9NSLLyKQkvehUSDH4pltCjkHgPy0s2w&s",
//     publisher: "환경 출판사",
//     isBookmarked: false,
//     readingStatus: "READ",
//   },
// ];

const results: SearchResponse[] = [];

const SearchPage: React.FC = () => {
  const [searchString, setSearchString] = React.useState("");

  const handleChangeSearchBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="flex flex-col w-full gap-5 overflow-y-auto">
      <div></div>
      <SearchBox value={searchString} handleChangeSearchBox={handleChangeSearchBox} />
      {results.length === 0 ? (
        <p className="mt-7 m-auto text-base font-light">검색 결과가 없습니다.</p>
      ) : (
        <BookCardGrid>
          {results.map((result, idx) => (
            <BookCardItem
              key={idx}
              bookId={result.bookId}
              title={result.title}
              thumbnail={result.thumbnail}
              authors={result.authors}
              completionReadingTime={""}
            />
          ))}
        </BookCardGrid>
      )}
    </div>
  );
};

export default SearchPage;
