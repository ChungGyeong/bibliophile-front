import React from "react";
import { useNavigate } from "react-router-dom";
import BottomSheetStopwatch from "@/components/bottomSheet/BottomSheetStopwatch.tsx";
import BottomSheet from "@/components/bottomSheet/BottomSheet.tsx";

interface BookInfoProps {
  bookId: number;
  thumbnail: string;
  title: string;
  authors: string;
  publisher: string;
  createDate: string;
  totalReadingTime: string;
}

const BookInfo: React.FC<BookInfoProps> = ({
  bookId,
  thumbnail,
  title,
  authors,
  publisher,
  createDate,
  totalReadingTime,
}) => {
  const [isOpenStopwatch, setIsOpenStopwatch] = React.useState(false);

  const navigate = useNavigate();

  const handleClickNavigateBookDetail = (_e: any, bookId: number) => {
    navigate(`/books/${bookId}`);
  };

  const handleClickOpenStopwatch = () => {
    setIsOpenStopwatch(!isOpenStopwatch);
  };

  return (
    <div className="relative w-screen -left-[5.5%] h-fit max-w-[600px] overflow-hidden">
      {isOpenStopwatch && (
        <BottomSheet height={600} handleCloseBottomSheet={handleClickOpenStopwatch}>
          <BottomSheetStopwatch />
        </BottomSheet>
      )}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <p
        className="absolute top-5 right-5 text-white text-sm z-20"
        onClick={e => handleClickNavigateBookDetail(e, bookId)}
      >
        책 상세보기
      </p>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6 pt-12">
        <div className="relative w-48 h-64 mb-4">
          <img
            src={thumbnail}
            alt="Book Cover"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <h1 className="text-lg font-medium mb-1.5">{title}</h1>
        <p className="text-sm font-light mb-1.5">{authors}</p>
        <p className="text-xs font-light text-gray-300 mb-8">{publisher}</p>

        <div className="w-full max-w-[600px] flex justify-between items-end">
          <p className="text-sm font-medium">{createDate}부터 7일째</p>
          <div className="flex flex-col items-end">
            <p className="text-[10px] mb-1 font-light">클릭하면 여우가 요리를 시작해요!</p>
            <div className="flex items-end gap-2" onClick={handleClickOpenStopwatch}>
              <i className="fi fi-rr-alarm-clock"></i>
              <span className="text-lg font-regular">{totalReadingTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
