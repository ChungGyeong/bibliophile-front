import React, { useState } from "react";
import Button from "../common/Button";
import StarScore from "../review/StarScore";
import { useDispatch } from "react-redux";
import { addReview } from "@/redux/reviewSlice";
import { AppDispatch } from "@/redux/store.ts";
import Modal from "@/components/common/Modal";

interface BottomSheetReviewProps {
  onClose: () => void;
  bookId: number;
  thumbnail: string;
}

const BottomSheetReview: React.FC<BottomSheetReviewProps> = ({ onClose, bookId, thumbnail }) => {
  const [review, setReview] = useState<string>("");
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputReview = e.target.value;

    if (inputReview.length > 100) {
      setModalMessage("최대 100자까지 입력 가능합니다.");
      setIsModalOpen(true);
    } else {
      setReview(inputReview);
    }
  };

  const handleButtonClick = async () => {
    if (!review) {
      setModalMessage("내용을 입력해주세요.");
      setIsModalOpen(true);
      return;
    }
    if (score === 0) {
      setModalMessage("별점을 입력해주세요.");
      setIsModalOpen(true);
      return;
    }
    const createData = {
      content: review,
      star: score,
      bookId: bookId,
    };
    await dispatch(addReview(createData));

    onClose();
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  return (
    <div className="flex flex-col items-center justify-center m-[5%]">
      <p className="font-bold text-xl leading-normal mt-[8%]">리뷰 작성하기</p>
      <img src={thumbnail} alt="thumnail" className="h-[160px] my-[5%]" />
      <p className="font-regular text-lg leading-normal mb-[1%]">책은 재미있으셨나요?</p>
      <StarScore onChangeScore={handleScoreChange} mode="write" />
      <textarea
        value={review}
        onChange={handleReviewChange}
        placeholder="100자 이내로 작성해주세요"
        className="w-[300px] h-[100px] border-2 border-gray-300 p-2 rounded-md outline-none font-light text-xs mt-[3%] mb-[5%]"
      />
      <Button label="작성 완료" handleClickButton={handleButtonClick} />

      <Modal
        isOpen={isModalOpen}
        handleClickClose={() => setIsModalOpen(false)}
        title={modalMessage}
        handleClickConfirm={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BottomSheetReview;
