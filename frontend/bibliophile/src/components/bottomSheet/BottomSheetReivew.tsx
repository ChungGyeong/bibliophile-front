import React, { useState } from "react";
import BottomSheet from "./BottomSheet";
import Button from "../common/Button";
import StarScore from "../review/StarScore";

const data = {
    title: "책 먹는 여우",
    authors: "프란치스카 비어만",
    thumbnail: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788934935018.jpg",
  }

const BottomSheetReview: React.FC = () => {
  const [review, setReview] = useState<string>("");
  const [score, setScore] = useState(0);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleButtonClick = () => {
    alert(`입력값: ${review} ${score}`);
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  return (
    <BottomSheet height={700}>
      <div className="flex flex-col items-center justify-center m-[5%]">
        <p className="font-bold text-xl leading-normal mt-[10%]">리뷰 작성하기</p>
        <img src={data.thumbnail} alt="thumnail" className="h-[160px] my-[10%]"/>
        <p className="font-regular text-lg leading-normal mb-[2%]">책은 재미있으셨나요?</p>
        <StarScore onChangeScore={handleScoreChange} mode="write"/>
        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="책에 대한 평가를 남겨주세요"
          className="w-[300px] h-[100px] border-2 border-gray-300 p-2 rounded-md outline-none mb-5 font-light text-xs mt-[3%] mb-[10%]"
        />
        <Button label="저장하기" onClick={handleButtonClick} />
      </div>
    </BottomSheet>
  );
};

export default BottomSheetReview;
