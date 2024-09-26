import React from "react";
import BookCardItem from "../components/bookCard/BookCardItem";
import BookCardGrid from "@/components/bookCard/BookCardGrid.tsx";

// TODO: 추후 API로 불러오기
const finishedBooks = [
  {
    myBookId: 1,
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
    completionReadingTime: "2024-02-18",
  },
  {
    myBookId: 1,
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
    completionReadingTime: "2024-02-18",
  },
  {
    myBookId: 1,
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
    completionReadingTime: "2024-02-18",
  },
  {
    myBookId: 1,
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
    completionReadingTime: "2024-02-18",
  },
];

const MyBookFinishPage: React.FC = () => {
  return (
    <div className="mt-[40px]">
      <BookCardGrid>
        {finishedBooks.map((book, idx) => (
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
    </div>
  );
};

export default MyBookFinishPage;
