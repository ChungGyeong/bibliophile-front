import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomSheetStopwatch from "@/components/bottomSheet/BottomSheetStopwatch.tsx";
import BottomSheet from "@/components/bottomSheet/BottomSheet.tsx";
import { calculateDaysSince, formatDate } from "@/utils/calDate.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store.ts";
import { addTimer } from "@/redux/timerSlice";

interface BookInfoProps {
  bookId: number;
  myBookId: number;
  thumbnail: string;
  title: string;
  authors: string;
  publisher: string;
  createDate: string;
  totalReadingTime: string;
  reloadMyBook?: () => void;
}

const BookInfo: React.FC<BookInfoProps> = ({
  bookId,
  myBookId,
  thumbnail,
  title,
  authors,
  publisher,
  createDate,
  totalReadingTime,
  reloadMyBook,
}) => {
  const [isOpenStopwatch, setIsOpenStopwatch] = React.useState(false);
  const [formattedTime, setFormattedTime] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickNavigateBookDetail = (_e: any, bookId: number) => {
    navigate(`/books/${bookId}`);
  };

  const handleClickOpenStopwatch = async () => {
    sendTime(formattedTime); 
    
    const createData = {
      myBookId: myBookId,
      duration: formattedTime,
    };
    await dispatch(addTimer(createData));
    if (reloadMyBook) {
      reloadMyBook();
    }
    setIsOpenStopwatch(false);
  };

  const sendTime = (time: string) => {
    setFormattedTime(time);
  };

  return (
    <div className="relative w-screen -left-[5.5%] h-fit max-w-[600px] overflow-hidden">
      {isOpenStopwatch && (
        <BottomSheet height={80} handleCloseBottomSheet={handleClickOpenStopwatch}>
          <BottomSheetStopwatch totalReadingTime={totalReadingTime} sendTime={sendTime} />
        </BottomSheet>
      )}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <i
        className="fi fi-rr-angle-left absolute top-5 left-5 text-white text-xl z-20"
        onClick={() => {
          navigate(-1);
        }}
      ></i>

      <p
        className="absolute top-5 right-5 text-white text-sm z-20"
        onClick={e => handleClickNavigateBookDetail(e, bookId)}
      >
        책 상세보기
      </p>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6 pt-12">
        <div className="relative w-[140px] h-[200px] mb-4">
          <img
            src={thumbnail}
            alt="Book Cover"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <h1 className="text-lg font-medium mb-1.5 m-auto text-center leading-none text-balance">
          {title}
        </h1>
        <p className="text-sm font-light mb-1.5">{authors}</p>
        <p className="text-xs font-light text-gray-300 mb-8">{publisher}</p>

        <div className="w-full max-w-[600px] flex justify-between items-end">
          <p className="text-sm font-medium">
            {reloadMyBook === undefined
              ? `${formatDate(createDate)}부터 ${calculateDaysSince(createDate)}일 동안`
              : `${formatDate(createDate)}부터 ${calculateDaysSince(createDate)}일째`}
          </p>
          <div
            className="flex items-end gap-2"
            onClick={() => {
              reloadMyBook !== undefined && setIsOpenStopwatch(true);
            }}
          >
            <i className="fi fi-rr-alarm-clock"></i>
            <span className="text-lg font-regular">{totalReadingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
