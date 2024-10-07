import React, { useState, useEffect } from "react";
import DoubleButton from "../../components/common/DoubleButton";
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
import { loadMyReview } from "@/redux/reviewSlice";
import {
  loadMyBook,
  editMyBookStatus,
  editReadingPage,
  removeMyBook,
} from "@/redux/myBookSlice.ts";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { useNavigate, useParams } from "react-router-dom";

const ReadingBookDetailPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { book, loading, error } = useSelector((state: RootState) => state.myBook);
  const { myBookId } = useParams<{ myBookId: string }>();
  const [modalType, setModalType] = useState<
    "confirmReading" | "confirmRead" | "confirmDelete" | null
  >(null);

  const [isPageOpen, setIsPageOpen] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const memos = useSelector((state: RootState) => state.memo.myMemoList);
  const memoLoading = useSelector((state: RootState) => state.memo.loading);
  const report = useSelector((state: RootState) => state.report.data);
  const reportLoading = useSelector((state: RootState) => state.report.loading);
  const review = useSelector((state: RootState) => state.review.data);
  const reviewLoading = useSelector((state: RootState) => state.review.loading);

  useEffect(() => {
    if (myBookId) {
      dispatch(loadMyBook(Number(myBookId)));
      dispatch(loadMyMemoList(Number(myBookId)));
      dispatch(loadMyReport(Number(myBookId)));
      dispatch(loadMyReview(Number(myBookId)));
    }
  }, [dispatch, myBookId]);

  const handlePageBottomSheetToggle = () => {
    setIsPageOpen(!isPageOpen);
  };

  const handleMemoBottomSheetToggle = () => {
    dispatch(loadMyMemoList(Number(myBookId)));
    setIsMemoOpen(!isMemoOpen);
  };

  const handleReportBottomSheetToggle = () => {
    dispatch(loadMyReport(Number(myBookId)));
    setIsReportOpen(!isReportOpen);
  };

  const handleReviewBottomSheetToggle = () => {
    dispatch(loadMyReview(Number(myBookId)));
    setIsReviewOpen(!isReviewOpen);
  };

  const handleModalToggle = (type: "confirmReading" | "confirmRead" | "confirmDelete" | null) => {
    setModalType(type);
  };

  const handleConfirm = () => {
    if (book) {
      if (modalType === "confirmReading") {
        dispatch(editMyBookStatus({ myBookId: book.myBookId, status: "READING" }));
      } else if (modalType === "confirmRead") {
        dispatch(editMyBookStatus({ myBookId: book.myBookId, status: "READ" }));
      } else if (modalType === "confirmDelete") {
        dispatch(removeMyBook(book.myBookId)).then(() => {
          navigate("/mybook/reading", { replace: true });
          setTimeout(() => {
            window.location.reload();
          });
        });
      }
    }
    setModalType(null);
  };

  const handleReadingPageUpdate = (page: number) => {
    if (book) {
      dispatch(editReadingPage({ myBookId: book.myBookId, page }));
    }
  };

  const handleSavePage = (page: number) => {
    handleReadingPageUpdate(page);
    setIsPageOpen(false);
  };

  const reloadfuction = async () => {
    await dispatch(loadMyReview(Number(myBookId)));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <img src="/images/loading.gif" alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>error: {error}</div>;
  }

  if (!book) {
    return <div>나의 책 정보가 없습니다</div>;
  }

  if (memoLoading || reportLoading || reviewLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <img src="/images/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      {modalType !== null && (
        <Modal
          isOpen={true}
          handleClickClose={() => setModalType(null)}
          title={
            modalType === "confirmReading"
              ? "정말 다시 요리하나요?"
              : modalType === "confirmRead"
                ? "정말 끝까지 다 요리했나요?"
                : modalType === "confirmDelete"
                  ? "정말 내 책장에서 삭제하나요?"
                  : ""
          }
          handleClickConfirm={handleConfirm}
        />
      )}

      <div className="relative w-screen -left-[5.5%]">
        {isPageOpen && (
          <BottomSheet height={440} handleCloseBottomSheet={handlePageBottomSheetToggle}>
            <BottomSheetPage
              onSave={(page: number) => handleSavePage(page)}
              totalPage={book.totalPage}
            />
          </BottomSheet>
        )}

        {isMemoOpen && (
          <BottomSheet height={90} handleCloseBottomSheet={handleMemoBottomSheetToggle}>
            <BottomSheetMemo
              onClose={handleMemoBottomSheetToggle}
              label="메모"
              mode="작성하기"
              myBookId={Number(myBookId)}
            />
          </BottomSheet>
        )}

        {isReportOpen && (
          <BottomSheet height={90} handleCloseBottomSheet={handleReportBottomSheetToggle}>
            <BottomSheetMemo
              onClose={handleReportBottomSheetToggle}
              label="독후감"
              mode="작성하기"
              myBookId={Number(myBookId)}
            />
          </BottomSheet>
        )}

        {isReviewOpen && (
          <BottomSheet height={700} handleCloseBottomSheet={handleReviewBottomSheetToggle}>
            <BottomSheetReview
              bookId={book.bookId}
              thumbnail={book.thumbnail}
              onClose={handleReviewBottomSheetToggle}
            />
          </BottomSheet>
        )}
      </div>
      {book?.readingStatus === "READING" ? (
        <div>
          <div className="mb-[40px]">
            <BookInfo
              bookId={book.bookId}
              myBookId={Number(myBookId)}
              thumbnail={book.thumbnail}
              title={book.title}
              authors={book.authors}
              publisher={book.publisher}
              createDate={book.createdDate}
              totalReadingTime={book.totalReadingTime}
            />
          </div>

          <div>
            <h2 className="font-semibold text-[18px] mb-5">현재 요리는 이만큼 완성!</h2>
            <div className="w-full flex flex-col items-end">
              <span className="font-light text-[12px] text-wrap text-gray text-end w-full">
                클릭해서 페이지를 수정하세요!
              </span>
              <span className="font-medium text-[14px]" onClick={handlePageBottomSheetToggle}>
                {book.readingPage} / {book.totalPage} p
              </span>
            </div>
            <ProgressBar isThin={false} percent={book.readingPercent} />
            <br />
            <DoubleButton
              firstLabel="끝까지 요리했어요!"
              secondLabel="책장에서 지우기"
              onFirstClick={() => handleModalToggle("confirmRead")}
              onSecondClick={() => handleModalToggle("confirmDelete")}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-[40px]">
            <BookInfo
              bookId={book.bookId}
              myBookId={Number(myBookId)}
              thumbnail={book.thumbnail}
              title={book.title}
              authors={book.authors}
              publisher={book.publisher}
              createDate={book.createdDate}
              totalReadingTime={book.totalReadingTime}
            />
          </div>

          <div>
            <h2 className="font-semibold text-[18px] mb-[10px]">여우가 먹은 요리예요!</h2>
            <div className="mb-[40px]">
              <DoubleButton
                firstLabel="다시 요리하기"
                secondLabel="책장에서 지우기"
                onFirstClick={() => handleModalToggle("confirmReading")}
                onSecondClick={() => handleModalToggle("confirmDelete")}
              />
            </div>
          </div>

          {review && review.reviewId !== 0 ? (
            <div>
              <h2 className="font-semibold text-[18px] mb-[10px]">리뷰</h2>
              <ReviewCard
                reviewId={review.reviewId}
                content={review.content}
                star={review.star}
                nickname={review.nickname}
                type="item"
                reload={reloadfuction}
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

          {report && report.bookReportId !== 0 ? (
            <div className="mt-[40px]">
              <h2 className="font-semibold text-[18px] mb-[10px]">독후감</h2>
              <MemoCard
                id={report.bookReportId}
                type="report"
                content={report.content}
                imgUrl={
                  Array.isArray(report.bookReportImgUrlList) &&
                  report.bookReportImgUrlList.length > 0
                    ? report.bookReportImgUrlList[0]
                    : ""
                }
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
