import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTimer } from "@/redux/timerSlice";
import { AppDispatch } from "@/redux/store.ts";

interface BottomSheetStopwatchProps {
  myBookId: number;
  totalReadingTime: string;
}

const BottomSheetStopwatch: React.FC<BottomSheetStopwatchProps> = ({
  myBookId,
  totalReadingTime,
}) => {
  const [running, setRunning] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const initialStartTime = new Date();
    setStartTime(initialStartTime);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      interval = setInterval(() => {
        setTime(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [running, time]);

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const formatToServerCompatible = (date: Date) => {
    return date.toISOString().replace("T", " ").split(".")[0] + ".000000";
  };

  const handleClickButton = async () => {
    if (running) {
      const pauseTime = new Date();
      if (startTime) {
        const createData = {
          myBookId: myBookId,
          startTime: formatToServerCompatible(startTime),
          endTime: formatToServerCompatible(pauseTime),
        };
        await dispatch(addTimer(createData));
      }
    } else {
      const newStartTime = new Date();
      setStartTime(newStartTime);
    }
    setRunning(!running);
  };

  return (
    <div className="flex flex-col items-center justify-center m-[20%]">
      <p className="font-light text-base leading-normal">그동안 읽은 시간 : {totalReadingTime}</p>
      <img className="my-[10%]" src="./src/assets/book-reading-fox.gif" alt="책 읽는 여우" />
      <p className="font-light text-base leading-normal">다시 요리를 시작한지 ...</p>
      <p className="font-bold text-4xl leading-normal mb-[10%]">{formatTime(time)}</p>
      <div onClick={handleClickButton}>
        {running ? (
          <i className="fi fi-rr-pause-circle text-6xl text-active-orange pt-2"></i>
        ) : (
          <i className="fi fi-rr-play-circle text-6xl text-olive pt-2"></i>
        )}
      </div>
    </div>
  );
};

export default BottomSheetStopwatch;
