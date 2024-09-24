import React from "react";
import BookCardItem from "@/components/bookCard/BookCardItem.tsx";

const datas = [
  {
    books_id: 1,
    title: "string",
    authors: "string",
    thumbnail: "https://image.yes24.com/goods/232775/XL",
    completionReadingTime: "2024-02-18",
  },
  {
    books_id: 2,
    title: "string",
    authors: "string",
    thumbnail: "https://image.yes24.com/goods/232775/XL",
    completionReadingTime: "",
  },
  {
    books_id: 1,
    title: "string",
    authors: "string",
    thumbnail: "https://image.yes24.com/goods/232775/XL",
    completionReadingTime: "2024-02-18",
  },
  {
    books_id: 2,
    title: "string",
    authors: "string",
    thumbnail: "https://image.yes24.com/goods/232775/XL",
    completionReadingTime: "",
  },
  {
    books_id: 1,
    title: "string",
    authors: "string",
    thumbnail: "https://image.yes24.com/goods/232775/XL",
    completionReadingTime: "2024-02-18",
  },
  {
    books_id: 2,
    title: "string",
    authors: "string",
    thumbnail: "https://image.yes24.com/goods/232775/XL",
    completionReadingTime: "",
  },
];

const BookCardGrid: React.FC = () => {
  return (
    <div className="flex w-full flex-wrap justify-between gap-5 overflow-auto">
      {datas.map((data, idx) => (
        <BookCardItem
          key={idx}
          bookId={data.books_id}
          title={data.title}
          thumbnail={data.thumbnail}
          authors={data.authors}
          completionReadingTime={data.completionReadingTime}
        />
      ))}
    </div>
  );
};

export default BookCardGrid;
