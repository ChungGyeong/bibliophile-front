import React from "react";
import LikeButton from "@/components/common/LikeButton.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { formatDate } from "@/utils/calDate.ts";

interface BookCardItemProps {
  bookId: number;
  title: string;
  thumbnail: string;
  authors: string;
  isBookmarked?: boolean;
  completionReadingTime?: string;
}

const BookCardItem: React.FC<BookCardItemProps> = ({
  bookId,
  title,
  thumbnail,
  authors,
  isBookmarked,
  completionReadingTime,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickNavigateMoreInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
        {completionReadingTime ? (
          <p className="text-medium-gray text-[10px] font-medium">
            {formatDate(completionReadingTime)}
          </p>
        ) : (
          <LikeButton isBookmarked={isBookmarked ?? false} bookId={bookId} />
        )}
        <div>
          <p
            className="text-medium-gray text-[10px] font-light z-10 w-full"
            onClick={handleClickNavigateMoreInfo}
          >
            더보기
          </p>
        </div>
      </div>

      <img
        src={thumbnail}
        alt={`'${title}' 표지`}
        className="object-contain self-center mt-2 aspect-[0.75] w-[90px]"
      />

      <p className="self-start mt-3.5 font-regular text-xs w-[100px] m-auto line-clamp-1">
        {title}
      </p>
      <p className="self-start  w-[100px] m-auto  font-light text-medium-gray text-[10px] line-clamp-1">
        {authors}
      </p>
    </div>
  );
};

export default BookCardItem;
