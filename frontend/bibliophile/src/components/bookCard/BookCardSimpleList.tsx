import React from "react";
import BookCardSimpleItem from "@/components/bookCard/BookCardSimpleItem.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface BookCardSimpleListProps {}

const datas = [
  {
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
  },
  {
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
  },
  {
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
  },
  {
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
  },
  {
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
  },
];

const BookCardSimpleList: React.FC<BookCardSimpleListProps> = () => {
  return (
    <Swiper spaceBetween={15} slidesPerView={3} className="h-[167px]">
      {datas.map((data, idx) => (
        <SwiperSlide key={idx}>
          <BookCardSimpleItem
            thumbnail={data.thumbnail}
            title={data.title}
            authors={data.authors}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BookCardSimpleList;
