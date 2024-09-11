import React from "react";
import { useNavigate } from "react-router-dom";

interface BookCardReadingProps {
  thumbnail: string;
  title: string;
  authors: string;
  publisher: string;
  createdDate: string;
  readingPage: number;
  totalPage: number;
  isActive: boolean;
}

const activeClass = "bg-lightYellow";

const BookCardReading: React.FC<BookCardReadingProps> = ({
  thumbnail,
  title,
  authors,
  publisher,
  createdDate,
  readingPage,
  totalPage,
  isActive,
}) => {
  const navigate = useNavigate();

  const handleClickNavMoreInfo = (e: { stopPropagation: () => void }) => {
    // TODO: 상세페이지로 이동
    e.stopPropagation();
    navigate("");
  };

  return (
    <div
      className={`bg-white border-common h-[140px] w-full flex p-[10px] gap-[10px] shadow-custom active:shadow-customInner ${isActive && activeClass}`}
      onClick={handleClickNavMoreInfo}
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
            className="font-ligt text-mediumGray text-[10px] z-10 relative active:text-black"
            onClick={handleClickNavMoreInfo}
          >
            더보기
          </p>
        </div>
        <div className="flex w-full justify-between">
          <p className="text-[10px]">{createdDate} ~</p>
          <p className="font-light text-[10px]">
            {readingPage} / {totalPage} p
          </p>
        </div>
        {/*상태바*/}
      </div>
    </div>
  );
};

export default BookCardReading;
