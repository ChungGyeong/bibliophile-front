import React from "react";
import BookCardReadingItem from "../components/bookCard/BookCardReadingItem";

// TODO: API로 대체
const readingBooks = [
  {
    myBookId: 1,
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    publisher: "주니어 김영사",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
    createdDate: "2024-02-18",
    readingPage: 120,
    totalPage: 220,
    readingPercent: 54,
    isActive: false,
  },
  {
    myBookId: 2,
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    publisher: "주니어 김영사",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
    createdDate: "2024-02-18",
    readingPage: 120,
    totalPage: 220,
    readingPercent: 54,
    isActive: false,
  },
];

const MyBookReadingPage: React.FC = () => {
  return (
    <div className="mt-[40px] space-y-[20px]">
      {readingBooks.map((book, idx) => (
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
          isActive={book.isActive}
        />
      ))}
    </div>
  );
};

export default MyBookReadingPage;
