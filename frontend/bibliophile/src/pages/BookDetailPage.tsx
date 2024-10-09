import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/common/Button";
import BookCardSimpleList from "../components/bookCard/BookCardSimpleList";
import LikeButton from "../components/common/LikeButton";
import ReviewCard from "../components/review/ReviewCard";
import Modal from "../components/common/Modal";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadBookDetailByBookId, loadRelatedBookList } from "@/redux/bookSlice.ts";
import { loadMyBookId, addMyBook } from "@/redux/myBookSlice";
import { loadReviews } from "@/redux/reviewSlice";

interface ReviewDataResponse {
  reviewId: number;
  nickname: string;
  content: string;
  star: number;
  isHost: boolean;
  createdDate: string;
  lastModifyDate: string;
}

const BookDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { bookId } = useParams<{ bookId: string }>();

  const {
    book,
    loading: bookLoading,
    isLoadingRelatedBookList,
    relatedBookList,
  } = useSelector((state: RootState) => state.book);

  const { book: myBook, loading: myBookLoading } = useSelector((state: RootState) => state.myBook);

  const { reviewList: reviews } = useSelector((state: RootState) => state.review);

  const prevMyBookRef = useRef(myBook);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookDataLoaded, setIsBookDataLoaded] = useState(false);

  const groupReviews = (reviews: ReviewDataResponse[], size: number) => {
    const grouped = [];
    for (let i = 0; i < reviews.length; i += size) {
      grouped.push(reviews.slice(i, i + size));
    }
    return grouped;
  };

  const groupedReviews = groupReviews(reviews, 5);

  useEffect(() => {
    if (bookId) {
      const numericBookId = parseInt(bookId, 10);

      const loadBookData = async () => {
        try {
          await dispatch(loadBookDetailByBookId(numericBookId)).unwrap();
          await dispatch(loadMyBookId(numericBookId)).unwrap();

          dispatch(loadRelatedBookList(numericBookId));
          dispatch(loadReviews(numericBookId));
        } finally {
          setIsBookDataLoaded(true);
        }
      };
      loadBookData();
    }
  }, [dispatch, bookId]);

  useEffect(() => {
    if (prevMyBookRef.current !== myBook) {
      prevMyBookRef.current = myBook;
    }
  }, [myBook]);

  const handleStartReading = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmStartReading = () => {
    setIsModalOpen(false);
    if (bookId) {
      dispatch(addMyBook(Number(bookId))).then(() => {
        dispatch(loadMyBookId(Number(bookId)));
      });
    }
  };

  const handleNavigateMyBook = () => {
    if (myBook && myBook.myBookId) {
      navigate(`/reading/${myBook.myBookId}`, { state: { from: location.pathname } });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (myBookLoading || bookLoading || !isBookDataLoaded) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <img src="/images/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="my-[40px]">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          handleClickClose={handleModalClose}
          title="정말 읽기 시작하시겠습니까?"
          handleClickConfirm={handleConfirmStartReading}
        />
      )}

      <div className="flex justify-between text-[20px]">
        <button onClick={handleBack}>
          <i className="fi fi-rr-angle-left" />
        </button>
        <div>
          {book && (myBook?.bookId !== book.bookId || !myBook) && (
            <div className="text-[20px]">
              <LikeButton isBookmarked={book.isBookmarked} bookId={book.bookId} />
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
          {!myBook || myBook?.bookId !== book?.bookId ? (
            <Button label="읽기 시작하기" handleClickButton={handleStartReading} />
          ) : (
            <Button label="나의 책장에서 보기" handleClickButton={handleNavigateMyBook} />
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

        {groupedReviews && groupedReviews.length > 0 ? (
          <Carousel>
            <CarouselContent>
              {groupedReviews.map((group, index) => (
                <CarouselItem key={index}>
                  <div className="space-y-[10px]">
                    {group.map(review => (
                      <ReviewCard
                        reviewId={review.reviewId}
                        key={review.reviewId}
                        content={review.content}
                        star={review.star}
                        nickname={review.nickname}
                        type="list"
                      />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="text-[14px] font-light">등록된 리뷰가 없습니다</div>
        )}
      </div>

      <hr />

      <div className="my-[30px] mb-[80px]">
        <h2 className="font-medium text-[18px] mb-[10px]">비슷한 줄거리의 다른 책도 추천해요!</h2>
        {isLoadingRelatedBookList ? (
          <img src="/images/loading.gif" alt="로딩 중..." className="m-auto h-[100px]" />
        ) : (
          <BookCardSimpleList books={relatedBookList} />
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
