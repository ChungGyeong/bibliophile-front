import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  type: "report" | "memo";
  id: number;
  content: string;
  imgUrl: string;
  createdDate: string;
  memoPage?: number;
}

const MemoCard: React.FC<CardProps> = ({ type, id, content, imgUrl, createdDate, memoPage }) => {
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    return date.substring(0, 16);
  };

  const handleMemoCardClick = () => {
    if (type === "report") {
      navigate("");
    } else if (type === "memo") {
      navigate("");
    }
  };

  return (
    <div
      onClick={handleMemoCardClick}
      className="h-[140px] p-[10px] shadow-custom active:shadow-custom-inner border rounded-[5px] flex items-center"
    >
      <div className="h-[120px] w-[120px] bg-gray flex-shrink-0">
        <img src={imgUrl} alt="thumbnail" />
      </div>

      <div className="h-[120px] ml-[10px] flex-grow">
        <div className="flex justify-between text-[10px] mb-[6px]">
          <div className="font-medium">{formatDate(createdDate)}</div>
          <span className="font-light text-medium-gray">더보기</span>
        </div>

        <div
          className={`font-light text-xs ${type === "report" ? "line-clamp-6" : "line-clamp-5"}`}
        >
          {content}
        </div>
        {type === "memo" && memoPage && (
          <div className="text-right font-medium text-[10px] text-gray-500 mt-2">... {memoPage} p</div>
        )}
      </div>
    </div>
  );
};

export default MemoCard;