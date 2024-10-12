import React from "react";
import { useNavigate } from "react-router-dom";
import noImage from "@/assets/NoImage.png";
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
    return date.substring(0, 10);
  };

  const handleMemoCardClick = () => {
    if (type === "report") {
      navigate(`/report/${id}`);
    } else if (type === "memo") {
      navigate(`/memo/${id}`);
    }
  };

  return (
    <div
      onClick={handleMemoCardClick}
      className="h-[140px] p-[10px] shadow-custom active:shadow-custom-inner border rounded-[5px] flex items-center"
    >
      <div className="h-[120px] w-[120px] bg-white flex-shrink-0">
        {imgUrl ? (
          <img src={imgUrl} alt="thumbnail" className="h-full w-full object-cover" />
        ) : (
          <img src={noImage} alt="thumbnail" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="h-[120px] ml-[10px] flex-grow  flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-[10px] mb-[6px]">
            <div className="font-medium">{formatDate(createdDate)}</div>
            <span className="font-light text-medium-gray">더보기</span>
          </div>

          <div
            className={`font-light text-xs ${type === "report" ? "line-clamp-6" : "line-clamp-5"} break-all`}
          >
            {content}
          </div>
        </div>
        {type === "memo" && (
          <div className="text-right font-medium text-[10px] text-gray-500 mt-2">
            {memoPage ? `...${memoPage} p` : "페이지 없음"}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoCard;
