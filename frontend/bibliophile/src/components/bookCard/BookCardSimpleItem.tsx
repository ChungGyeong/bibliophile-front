import React from "react";
import { useNavigate } from "react-router-dom";

interface BookCardSimpleItemProps {
  bookId: number;
  thumbnail: string;
  title: string;
  authors: string;
}

const BookCardSimpleItem: React.FC<BookCardSimpleItemProps> = ({
  bookId,
  thumbnail,
  title,
  authors,
}) => {
  const navigate = useNavigate();

  const handleClickItem = () => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div
      className="h-full flex flex-col justify-between active:scale-[1.05]"
      onClick={handleClickItem}
    >
      <div className="h-4/5 overflow-hidden object-center object-cover">
        <img src={thumbnail} alt={title} className="w-full h-full" />
      </div>
      <div className="h-1/5 flex flex-col items-start justify-between mt-1">
        <p className="font-regular text-xs line-clamp-1">{title}</p>
        <p className="font-light text-medium-gray text-[10px] line-clamp-1">{authors}</p>
      </div>
    </div>
  );
};

export default BookCardSimpleItem;
