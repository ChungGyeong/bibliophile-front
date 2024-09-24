import React from "react";
import LikeButton from "@/components/common/LikeButton.tsx";
import { useNavigate, useLocation } from "react-router-dom";

interface BookCardItemProps {
  bookId: number;
  title: string;
  thumbnail: string;
  authors: string;
  completionReadingTime: string;
}

const BookCardItem: React.FC<BookCardItemProps> = ({
  bookId,
  title,
  thumbnail,
  authors,
  completionReadingTime,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickNavigateMoreInfo = () => {
    if (location.pathname.includes("/mybook/finish")) {
      navigate(`/reading/${bookId}`);
    } else {
      navigate(`/books/${bookId}`);
    }
  };

  return (
    <div
      className="flex flex-col p-3 h-fit bg-white border-common shadow-custom active:shadow-custom-inner"
      onClick={handleClickNavigateMoreInfo}
    >
      <div className="flex gap-5 justify-between whitespace-nowrap items-start h-[18px]">
        {completionReadingTime !== "" ? (
          <p className="text-medium-gray text-[10px] font-medium">{completionReadingTime}</p>
        ) : (
          <LikeButton bookId={bookId} />
        )}
        <div>
          <p
            className="text-medium-gray text-[10px] font-light z-10"
            onClick={handleClickNavigateMoreInfo}
          >
            더보기
          </p>
        </div>
      </div>

      <img
        src={thumbnail}
        alt={title}
        className="object-contain self-center mt-2 aspect-[0.75] w-[90px]"
      />

      <p className="self-start mt-3.5 ml-5 font-regular text-xs">{title}</p>
      <p className="self-start ml-5 font-light text-medium-gray text-[10px]">{authors}</p>
    </div>
  );
};

export default BookCardItem;
