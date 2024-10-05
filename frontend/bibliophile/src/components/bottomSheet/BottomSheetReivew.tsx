import React, { useState } from "react";
import Button from "../common/Button";
import StarScore from "../review/StarScore";
import { useDispatch } from "react-redux";
import { addReview } from "@/redux/reviewSlice";
import { AppDispatch } from "@/redux/store.ts";

interface BottomSheetReviewProps {
  onClose: () => void;
  bookId: number;
  thumbnail: string;
}

const BottomSheetReview: React.FC<BottomSheetReviewProps> = ({ onClose, bookId, thumbnail }) => {
  const [review, setReview] = useState<string>("");
  const [score, setScore] = useState(0);
  const dispatch: AppDispatch = useDispatch();

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };
  const handleButtonClick = async () => {
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
        placeholder="책에 대한 평가를 남겨주세요"
        className="w-[300px] h-[100px] border-2 border-gray-300 p-2 rounded-md outline-none font-light text-xs mt-[3%] mb-[5%]"
      />
      <Button label="작성 완료" handleClickButton={handleButtonClick} />
    </div>
  );
};

export default BottomSheetReview;
