import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import BookCardSimpleList from "../components/bookCard/BookCardSimpleList";
import LikeButton from "../components/common/LikeButton";
import ReviewCard from "../components/review/ReviewCard";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadBookDetailByBookId } from "@/redux/bookSlice.ts";

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

const BookDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { book } = useSelector((state: RootState) => state.book);

  const [relatedBooks, setRelatedBooks] = useState<BookSimpleDataResponse[]>([]);
  const [reviews, setReviews] = useState<ReviewDataResponse[]>([]);

  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();

  const groupReviews = (reviews: ReviewDataResponse[], size: number) => {
    const grouped = [];
    for (let i = 0; i < reviews.length; i += size) {
      grouped.push(reviews.slice(i, i + size));
    }
    return grouped;
  };
  const groupedReviews = groupReviews(reviews, 5);

  const isReading = book?.readingStatus === "READING" || book?.readingStatus === "READ";

  useEffect(() => {
    // const numericBookId = parseInt(bookId!, 10);

    dispatch(loadBookDetailByBookId(503));

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

  const handleStartReading = () => {
    // TODO: API 개발 뒤, 읽기 시작 API 요청으로 대체하기
    // 성공 시 bookData의 readingStatus가 "READING"이 될 것
    // 현재는 FE에서만 변경되도록 해둠 (삭제해야 함)
    // setBookData(prev => (prev ? { ...prev, data: { ...prev, readingStatus: "READING" } } : prev));
  };

  const handleNavigateMyBook = () => {
    navigate(`/reading/${book?.bookId}`);
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
          {!isReading && book?.bookId !== undefined && (
            <div className="text-[20px]">
              <LikeButton isBookmarked={book?.isBookmarked} bookId={book?.bookId} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-[10px] mb-[40px] flex flex-col items-center">
        <img
          className="h-[190px] w-[140px] mb-4"
          src={book?.thumbnail}
          alt={`'${book?.title}' 표지`}
        />
        <h2 className="font-medium text-[18px] mb-4 text-center leading-none">{book?.title}</h2>
        <p className="text-[14px] font-light">{book?.authors}</p>
        <span className="font-regular text-medium-gray text-[12px] mb-5">{book?.publisher}</span>

        <div className="w-[200px]">
          {isReading ? (
            <Button label="나의 책장에서 보기" handleClickButton={handleNavigateMyBook} />
          ) : (
            <Button label="읽기 시작하기" handleClickButton={handleStartReading} />
          )}
        </div>
      </div>

      <hr />

      <div className="my-[30px]">
        <h2 className="font-medium text-[18px] mb-[10px]">책 소개</h2>
        <p className="text-[14px] font-light">{book?.contents}</p>
      </div>

      <hr />

      <div className="mt-[30px] mb-[40px]">
        <h2 className="font-medium text-[18px] mb-[10px]">리뷰 모아보기</h2>

        <Carousel>
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
        </Carousel>
      </div>

      <hr />

      <div className="my-[30px] mb-[80px]">
        <h2 className="font-medium text-[18px] mb-[10px]">비슷한 줄거리의 다른 책도 추천해요!</h2>
        <BookCardSimpleList books={relatedBooks} />
      </div>
    </div>
  );
};

export default BookDetailPage;
