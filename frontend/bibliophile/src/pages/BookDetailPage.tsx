import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import BookCardSimpleList from "../components/bookCard/BookCardSimpleList";
import LikeButton from "../components/common/LikeButton";
import ReviewCard from "../components/review/ReviewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../components/ui/carousel";

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

interface ReviewDataResponse {
  reviewId: number;
  nickname: string;
  content: string;
  star: number;
  isHost: boolean;
  createdDate: string;
  lastModifyDate: string;
}

interface BookSimpleDataResponse {
  bookId: number;
  title: string;
  authors: string;
  thumbnail: string;
}

interface BookDetailProps {
  bookId: number;
}

const BookDetailPage: React.FC<BookDetailProps> = () => {
  const navigate = useNavigate();

  const { bookId } = useParams<{ bookId: string }>();
  const [bookData, setBookData] = useState<BookDataResponse | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<BookSimpleDataResponse[]>([]);
  const [reviews, setReviews] = useState<ReviewDataResponse[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const groupReviews = (reviews: ReviewDataResponse[], size: number) => {
    const grouped = [];
    for (let i = 0; i < reviews.length; i += size) {
      grouped.push(reviews.slice(i, i + size));
    }
    return grouped;
  };
  const groupedReviews = groupReviews(reviews, 5);

  const isReading =
    bookData?.data.readingStatus === "READING" || bookData?.data.readingStatus === "READ";

  useEffect(() => {
    const numericBookId = parseInt(bookId!, 10);

    // TODO: 추후 API 호출로 변경
    const dummyBookData: BookDataResponse = {
      status: 200,
      data: {
        bookId: numericBookId,
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

    // TODO: 추후 API 호출로 변경
    const dummyRelatedBooks: BookSimpleDataResponse[] = [
      {
        bookId: 2,
        title: "책 먹는 여우 2",
        authors: "프란치스카 비어만",
        thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
      },
      {
        bookId: 3,
        title: "책 먹는 여우 3",
        authors: "프란치스카 비어만",
        thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
      },
      {
        bookId: 4,
        title: "책 먹는 여우 4",
        authors: "프란치스카 비어만",
        thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
      },
      {
        bookId: 5,
        title: "책 먹는 여우 5",
        authors: "프란치스카 비어만",
        thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
      },
    ];

    setRelatedBooks(dummyRelatedBooks);

    // TODO: 추후 API 호출로 변경
    const dummyReviews: ReviewDataResponse[] = [
      {
        reviewId: 1,
        nickname: "사용자",
        content: "사용자가 작성한 리뷰가 보입니다.",
        star: 4,
        isHost: true,
        createdDate: "2024-02-18 07:53:23.795698",
        lastModifyDate: "2024-02-18 07:53:23.795698",
      },
      {
        reviewId: 2,
        nickname: "사용자",
        content: "사용자가 작성한 리뷰가 보입니다.",
        star: 3,
        isHost: true,
        createdDate: "2024-02-18 07:53:23.795698",
        lastModifyDate: "2024-02-18 07:53:23.795698",
      },
      {
        reviewId: 3,
        nickname: "사용자",
        content: "사용자가 작성한 리뷰가 보입니다.",
        star: 3,
        isHost: true,
        createdDate: "2024-02-18 07:53:23.795698",
        lastModifyDate: "2024-02-18 07:53:23.795698",
      },
      {
        reviewId: 4,
        nickname: "사용자",
        content: "사용자가 작성한 리뷰가 보입니다.",
        star: 3,
        isHost: true,
        createdDate: "2024-02-18 07:53:23.795698",
        lastModifyDate: "2024-02-18 07:53:23.795698",
      },
      {
        reviewId: 5,
        nickname: "사용자",
        content: "사용자가 작성한 리뷰가 보입니다.",
        star: 3,
        isHost: true,
        createdDate: "2024-02-18 07:53:23.795698",
        lastModifyDate: "2024-02-18 07:53:23.795698",
      },
      {
        reviewId: 6,
        nickname: "사용자",
        content: "사용자가 작성한 리뷰가 보입니다.",
        star: 3,
        isHost: true,
        createdDate: "2024-02-18 07:53:23.795698",
        lastModifyDate: "2024-02-18 07:53:23.795698",
      },
    ];

    setReviews(dummyReviews);
  }, [bookId]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const handleStartReading = () => {
    // TODO: API 개발 뒤, 읽기 시작 API 요청으로 대체하기
    // 성공 시 bookData의 readingStatus가 "READING"이 될 것
    // 현재는 FE에서만 변경되도록 해둠 (삭제해야 함)
    setBookData(prev =>
      prev ? { ...prev, data: { ...prev.data, readingStatus: "READING" } } : prev
    );
  };

  const handleNavigateMyBook = () => {
    navigate(`/reading/${bookData?.data.bookId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="my-[40px]">
      <div className="flex justify-between text-[20px]">
        <button onClick={handleBack}>
          <i className="fi fi-rr-angle-left" />
        </button>
        <div>
          {!isReading && bookData?.data.bookId !== undefined && (
            <LikeButton isBookmarked={bookData?.data.isBookmarked} bookId={bookData?.data.bookId} />
          )}
        </div>
      </div>

      <div className="mt-[10px] mb-[40px] flex flex-col items-center">
        <img className="h-[190px] w-[140px] mb-[16px]" src={bookData?.data.thumbnail} />
        <h2 className="font-medium text-[18px] mb-[2px]">{bookData?.data.title}</h2>
        <p className="text-[14px] font-light">{bookData?.data.authors}</p>
        <span className="font-regular text-medium-gray text-[12px] mt-[12px] mb-[20px]">
          {bookData?.data.publisher}
        </span>

        <div className="w-[200px]">
          {isReading ? (
            <Button label="나의 책장에서 보기" onClick={handleNavigateMyBook} />
          ) : (
            <Button label="읽기 시작하기" onClick={handleStartReading} />
          )}
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

        <Carousel setApi={setApi}>
          <CarouselContent>
            {groupedReviews.map((group, index) => (
              <CarouselItem key={index}>
                <div className="space-y-[10px]">
                  {group.map(review => (
                    <ReviewCard
                      key={review.reviewId}
                      content={review.content}
                      star={review.star}
                      nickname="사용자"
                      type="list"
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center mt-4 space-x-2">
            {groupedReviews.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  currentSlide === index ? "bg-orange" : "bg-soft-gray"
                }`}
              ></div>
            ))}
          </div>
        </Carousel>
      </div>

      <hr />

      <div className="my-[30px] mb-[80px]">
        <h2 className="font-medium text-[18px] mb-[10px]">이 책을 읽은 다른 사용자들은...</h2>
        <BookCardSimpleList books={relatedBooks} />
      </div>
    </div>
  );
};

export default BookDetailPage;
