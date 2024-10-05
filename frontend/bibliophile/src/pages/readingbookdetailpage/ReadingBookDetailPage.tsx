import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import ProgressBar from "../../components/common/ProgressBar";
import MemoCard from "../../components/common/MemoCard";
import ReviewCard from "../../components/review/ReviewCard";
import BookInfo from "./BookInfo";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import BottomSheetPage from "../../components/bottomSheet/BottomSheetPage";
import BottomSheetMemo from "../../components/bottomSheet/BottomSheetMemo";
import BottomSheetReview from "../../components/bottomSheet/BottomSheetReivew";
import Modal from "../../components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { loadMyMemoList } from "@/redux/memoSlice.ts";
import { loadMyReport } from "@/redux/reportSlice.ts";
import { AppDispatch, RootState } from "@/redux/store.ts";
// TODO: API 명세 수정되면 바뀔 가능성 있음 (bookReviewId, reviewId 어떻게 주는지 issue)
interface ReadingBookDetailResponse {
  bookId: number;
  myBookId: number;
  totalPage: number;
  readingPage: number;
  readingPercent: number;
  totalReadingTime: string;
  readingStatus: "READING" | "READ";
  isBookmarked: boolean;
  title: string;
  thumbnail: string;
  authors: string;
  publisher: string;
  completionReadingTime: string;
  createdDate: string;
  lastModifyDate: string;
}

interface BookReportResponse {
  bookReportId: number;
  content: string;
  imgUrl: string;
  isHost: boolean;
  bookReportImgList: Array<{
    imgUrl: string;
    createdDate: string;
    lastModifyDate: string;
  }>;
  createdDate: string;
  lastModifyDate: string;
}

interface BookReviewResponse {
  reviewId: number;
  content: string;
  star: number;
  nickname: string;
  isHost: true;
  createdDate: string;
  lastModifyDate: string;
}

const ReadingBookDetailPage: React.FC = () => {
  const [bookDetail, setBookDetail] = useState<ReadingBookDetailResponse | null>(null);
  const [review, setReview] = useState<BookReviewResponse | null>(null);
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const memos = useSelector((state: RootState) => state.memo.myMemoList.data);
  const memoLoading = useSelector((state: RootState) => state.memo.loading);
  const report = useSelector((state: RootState) => state.report.data.data);
  const reportLoading = useSelector((state: RootState) => state.report.loading);

  useEffect(() => {
    // TODO: 추후 API 호출로 변경
    const dummyBookDetail: ReadingBookDetailResponse = {
      bookId: 1,
      myBookId: 1,
      totalPage: 100,
      readingPage: 20,
      readingPercent: 20,
      totalReadingTime: "02:30:45",
      readingStatus: "READING",
      isBookmarked: true,
      title: "열다섯에 곰이라니",
      thumbnail: "https://image.yes24.com/Goods/116422051/XL",
      authors: "추정경",
      publisher: "다산책방",
      completionReadingTime: "2024-02-18 07:53:23.795698",
      createdDate: "2024-02-18 07:53:23.795698",
      lastModifyDate: "2024-02-18 07:53:23.795698",
    };
    setBookDetail(dummyBookDetail);

    dispatch(loadMyMemoList(41));
    dispatch(loadMyReport(41));

    const dummyReview: BookReviewResponse | null = {
      reviewId: 1,
      content: "리뷰 내용이 여기에 들어갑니다.",
      star: 4,
      nickname: "사용자",
      isHost: true,
      createdDate: "2024-02-18 07:53:23.795698",
      lastModifyDate: "2024-02-18 07:53:23.795698",
    };
    setReview(dummyReview);
  }, []);

  const handlePageBottomSheetToggle = () => {
    setIsPageOpen(!isPageOpen);
  };

  const handleMemoBottomSheetToggle = () => {
    setIsMemoOpen(!isMemoOpen);
  };

  const handleReportBottomSheetToggle = () => {
    dispatch(loadMyReport(41));
    setIsReportOpen(!isReportOpen);
  };

  const handleReviewBottomSheetToggle = () => {
    dispatch(loadMyMemoList(41));
    setIsReviewOpen(!isReviewOpen);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirmReadingComplete = () => {
    // TODO: 추후 API 호출로 readingStatus "READ"로 변경
    setIsModalOpen(false);
    if (bookDetail) {
      setBookDetail(prev => prev && { ...prev, readingStatus: "READ" });
    }
  };

  if (!bookDetail) {
    return <div></div>;
  }

  if (memoLoading || reportLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          handleClickClose={handleModalToggle}
          title="정말 끝까지 다 요리했나요?"
          handleClickConfirm={handleConfirmReadingComplete}
        />
      )}

      <div className="relative w-screen -left-[5.5%]">
        {isPageOpen && (
          <BottomSheet height={440} handleCloseBottomSheet={handlePageBottomSheetToggle}>
            <BottomSheetPage />
          </BottomSheet>
        )}

        {isMemoOpen && (
          <BottomSheet height={90} handleCloseBottomSheet={handleMemoBottomSheetToggle}>
            <BottomSheetMemo
              onClose={handleMemoBottomSheetToggle}
              label="메모"
              mode="작성하기"
              myBookId={41}
            />
          </BottomSheet>
        )}

        {isReportOpen && (
          <BottomSheet height={90} handleCloseBottomSheet={handleReportBottomSheetToggle}>
            <BottomSheetMemo
              onClose={handleReportBottomSheetToggle}
              label="독후감"
              mode="작성하기"
              myBookId={41}
            />
          </BottomSheet>
        )}

        {isReviewOpen && (
          <BottomSheet height={700} handleCloseBottomSheet={handleReviewBottomSheetToggle}>
            <BottomSheetReview />
          </BottomSheet>
        )}
      </div>
      {bookDetail?.readingStatus === "READING" ? (
        <div>
          <div className="mb-[40px]">
            <BookInfo
              bookId={bookDetail.bookId}
              thumbnail={bookDetail.thumbnail}
              title={bookDetail.title}
              authors={bookDetail.authors}
              publisher={bookDetail.publisher}
              createDate={bookDetail.createdDate}
              totalReadingTime={bookDetail.totalReadingTime}
            />
          </div>

          <div>
            <h2 className="font-semibold text-[18px] mb-[10px]">현재 요리는 이만큼 완성!</h2>
            <div className="mb-[20px]">
              <div className="flex justify-between">
                <span className="font-light text-[12px] text-gray">
                  클릭해서 페이지를 수정하세요!
                </span>
                <span className="font-medium text-[14px]" onClick={handlePageBottomSheetToggle}>
                  {bookDetail.readingPage} / {bookDetail.totalPage} p
                </span>
              </div>
              <ProgressBar isThin={false} percent={bookDetail.readingPercent} />
            </div>
            <Button label="끝까지 요리했어요!" handleClickButton={handleModalToggle} />
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-[40px]">
            <BookInfo
              bookId={bookDetail.bookId}
              thumbnail={bookDetail.thumbnail}
              title={bookDetail.title}
              authors={bookDetail.authors}
              publisher={bookDetail.publisher}
              createDate={bookDetail.createdDate}
              totalReadingTime={bookDetail.totalReadingTime}
            />
          </div>

          {review ? (
            <div>
              <h2 className="font-semibold text-[18px] mb-[10px]">리뷰</h2>
              <ReviewCard
                content={review.content}
                star={review.star}
                nickname={review.nickname}
                type="item"
              />
            </div>
          ) : (
            <div>
              <h2 className="font-semibold text-[18px] mb-[10px]">리뷰 작성하기</h2>
              <div className="h-[120px] border border-gray rounded-[5px] flex justify-center">
                <button onClick={handleReviewBottomSheetToggle}>
                  <i className="fi fi-rr-add text-[25px]" />
                </button>
              </div>
            </div>
          )}

          {report ? (
            <div className="mt-[40px]">
              <h2 className="font-semibold text-[18px] mb-[10px]">독후감</h2>
              <MemoCard
                id={report.bookReportId}
                type="report"
                content={report.content}
                imgUrl={report.bookReportImgUrlList[0]}
                createdDate={report.createdDate}
              />
            </div>
          ) : (
            <div className="mt-[40px]">
              <h2 className="font-semibold text-[18px] mb-[10px]">독후감 작성하기</h2>
              <div className="h-[120px] border border-gray rounded-[5px] flex justify-center">
                <button onClick={handleReportBottomSheetToggle}>
                  <i className="fi fi-rr-add text-[25px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {memos.length > 0 ? (
        <div className="mt-[40px]">
          <div className="flex justify-between">
            <h2 className="font-semibold text-[18px] mb-[20px]">메모</h2>
            <button onClick={handleMemoBottomSheetToggle}>
              <i className="fi fi-rr-add text-[25px]" />
            </button>
          </div>

          <div className="space-y-[20px]">
            {memos.map(memo => (
              <MemoCard
                key={memo.memoId}
                id={memo.memoId}
                type="memo"
                content={memo.content}
                imgUrl={memo.memoImgUrlList[0]}
                createdDate={memo.createdDate}
                memoPage={memo.memoPage}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-[40px]">
          <h2 className="font-semibold text-[18px] mb-[20px]">메모 작성하기</h2>
          <div className="h-[120px] border border-gray rounded-[5px] flex justify-center">
            <button onClick={handleMemoBottomSheetToggle}>
              <i className="fi fi-rr-add text-[25px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingBookDetailPage;
