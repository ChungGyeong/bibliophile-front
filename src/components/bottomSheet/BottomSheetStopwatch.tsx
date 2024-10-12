import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadFox } from "@/redux/foxSlice";

interface BottomSheetStopwatchProps {
  totalReadingTime: string;
  sendTime: (time: string) => void;
}

const BottomSheetStopwatch: React.FC<BottomSheetStopwatchProps> = ({
  totalReadingTime,
  sendTime,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { fox } = useSelector((state: RootState) => state.fox);
  const [running, setRunning] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    dispatch(loadFox());
  }, [dispatch]);

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

  function formatSecondsToISOTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let isoString = "PT";
    if (hours > 0) isoString += `${hours}H`;
    if (minutes > 0) isoString += `${minutes}M`;
    if (remainingSeconds > 0) isoString += `${remainingSeconds}S`;

    return isoString;
  }

  const handleClickButton = async () => {
    sendTime(formatSecondsToISOTime(time));
    setRunning(!running);
  };

  useEffect(() => {
    sendTime(formatSecondsToISOTime(time));
  }, [time]);

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <p className="font-light text-base leading-normal mt-10">
        그동안 읽은 시간 {totalReadingTime}
      </p>
      {fox && (
        <div>
          <img
            className="w-[250px] h-[250px]"
            src={`/images/fox/${fox.foxType === "ADULT" ? "youth" : fox.foxType.toLowerCase()}_timer.gif`}
            alt="책 읽는 여우"
          />
        </div>
      )}
      <div className="flex items-center flex-col">
        <p className="font-light text-base leading-normal">다시 요리를 시작한지 ...</p>
        <p className="font-bold text-4xl leading-normal">{formatTime(time)}</p>
      </div>
      <div onClick={handleClickButton} className="mb-10">
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
