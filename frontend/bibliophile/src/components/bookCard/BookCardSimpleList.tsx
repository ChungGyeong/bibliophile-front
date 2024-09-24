import React from "react";
import BookCardSimpleItem from "@/components/bookCard/BookCardSimpleItem.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface BookCardSimpleListProps {
  books: {
    bookId: number;
    title: string;
    authors: string;
    thumbnail: string;
  }[];
}

const BookCardSimpleList: React.FC<BookCardSimpleListProps> = ({ books }) => {
  return (
    <Swiper spaceBetween={15} slidesPerView={3} className="h-[167px]">
      {books.map((book, idx) => (
        <SwiperSlide key={idx}>
          <BookCardSimpleItem
            bookId={book.bookId}
            thumbnail={book.thumbnail}
            title={book.title}
            authors={book.authors}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BookCardSimpleList;
