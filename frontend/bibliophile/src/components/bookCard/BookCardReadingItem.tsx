import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/common/ProgressBar.tsx";

interface BookCardReadingProps {
  thumbnail: string;
  title: string;
  authors: string;
  publisher: string;
  createdDate: string;
  readingPage: number;
  totalPage: number;
  readingPercent: number;
  isActive: boolean;
}

const activeClass = "bg-light-yellow";

const BookCardReadingItem: React.FC<BookCardReadingProps> = ({
  thumbnail,
  title,
  authors,
  publisher,
  createdDate,
  readingPage,
  totalPage,
  readingPercent,
  isActive,
}) => {
  const navigate = useNavigate();

  const handleClickNavigateMoreInfo = (e: { stopPropagation: () => void }) => {
    // TODO: 상세페이지로 이동
    e.stopPropagation();
    navigate("");
  };

  return (
    <div
      className={`border-common h-[140px] w-full flex p-[10px] gap-[10px] shadow-custom active:shadow-custom-inner ${isActive && activeClass}`}
      onClick={handleClickNavigateMoreInfo}
    >
      <div className="w-1/3 h-full overflow-hidden object-center object-cover">
        <img src={thumbnail} alt={title} className="w-full h-full" />
      </div>
      <div className="w-2/3 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-base">{title}</p>
            <p className="font-medium text-[10px]">{authors}</p>
            <p className="font-light text-[10px]">{publisher}</p>
          </div>
          <p
            className="font-ligt text-medium-gray text-[10px] z-10 relative active:text-black"
            onClick={handleClickNavigateMoreInfo}
          >
            더보기
          </p>
        </div>
        <div>
          <div className="flex w-full justify-between">
            <p className="text-[10px]">{createdDate} ~</p>
            <p className="font-light text-[10px]">
              {readingPage} / {totalPage} p &nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <ProgressBar isThin={true} readingPercent={readingPercent} />
        </div>
      </div>
    </div>
  );
};

export default BookCardReadingItem;
