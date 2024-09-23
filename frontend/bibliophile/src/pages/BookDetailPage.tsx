import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import BookCardSimpleList from "../components/bookCard/BookCardSimpleList";
import LikeButton from "../components/common/LikeButton";

interface BookDataResponse {
  status: number;
  data: {
    bookId: number;
    contents: string;
    isbn: string;
    kdc: string;
    title: string;
    authors: string;
    pageNumber: string;
    thumbnail: string;
    publisher: string;
    isBookmarked: true;
    readingStatus: "UNREAD" | "READING" | "READ";
  };
  timeStamp: string;
}

interface BookDetailProps {
  bookId: number;
}

const BookDetailPage: React.FC<BookDetailProps> = ({ bookId }) => {
  const [bookData, setBookData] = useState<BookDataResponse | null>(null);
  const isReading =
    bookData?.data.readingStatus === "READING" || bookData?.data.readingStatus === "READ";

  useEffect(() => {
    // TODO: 추후 API 호출로 변경
    const dummyBookData: BookDataResponse = {
      status: 200,
      data: {
        bookId,
        contents:
          "《천 개의 파랑》으로 2020년 제4회 한국과학문학상 장편 부문 대상을 수상한, 천선란 첫 소설집! 《천 개의 파랑》으로 제4회 한국과학문학상 장편소설 부문 대상을 받은, 천선란 작가의 첫 소설집『어떤 물질의 사랑』",
        isbn: "9781234567890",
        kdc: "KDC100",
        title: "책 먹는 여우",
        authors: "프란치스카 비어만",
        pageNumber: "220",
        thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
        publisher: "주니어 김영사",
        isBookmarked: true,
        readingStatus: "UNREAD",
      },
      timeStamp: "2024-02-18 07:53:23.795698",
    };
    setBookData(dummyBookData);
  }, [bookId]);

  return (
    <div>
      <div className="my-[40px] flex flex-col items-center">
        <img className="h-[190px] w-[140px] mb-[16px]" src={bookData?.data.thumbnail} />
        <h2 className="font-medium text-[18px] mb-[2px]">{bookData?.data.title}</h2>
        <p className="text-[14px] font-light">{bookData?.data.authors}</p>
        <span className="font-regular text-medium-gray text-[12px] mt-[12px] mb-[20px]">
          {bookData?.data.publisher}
        </span>

        <div className="w-[200px]">
          <Button label="읽기 시작하기" />
        </div>
      </div>

      <hr />

      <div className="my-[30px]">
        <h2 className="font-medium text-[18px] mb-[10px]">책 소개</h2>
        <p className="text-[14px] font-light">{bookData?.data.contents}</p>
      </div>

      <hr />

      <div className="my-[30px]">
        <h2 className="font-medium text-[18px] mb-[10px]">리뷰 모아보기</h2>
      </div>

      <hr />

      <div className="my-[30px]">
        <h2 className="font-medium text-[18px] mb-[10px]">이 책을 읽은 다른 사용자들은...</h2>
      </div>
    </div>
  );
};

export default BookDetailPage;
