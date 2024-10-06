import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadStreaks } from "@/redux/streakSlice";

const defaultStyle: React.CSSProperties = {
  backgroundColor: "#EEEEEE",
  borderRadius: "50%",
  fontSize: "0px",
  pointerEvents: "none",
  width: "25px",
  height: "25px",
};

const StreakCalendar: React.FC = () => {
  const [lightOliveDays, setLightOliveDays] = useState<Date[]>([]);
  const [oliveDays, setOliveDays] = useState<Date[]>([]);
  const [mediumOliveDays, setMediumOliveDays] = useState<Date[]>([]);
  const [darkOliveDays, setDarkOliveDays] = useState<Date[]>([]);
  const [veryDarkOliveDays, setVeryDarkOliveDays] = useState<Date[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const { Streakdata } = useSelector((state: RootState) => state.streak);

  const handleMonthChange = async (month: Date) => {
    await fetchStreak(month.getFullYear(), month.getMonth());
  };

  const fetchStreak = async (year: number, month: number) => {
    await dispatch(loadStreaks({ year: year, month: month + 1 }));
  };

  useEffect(() => {
    const today = new Date();
    fetchStreak(today.getFullYear(), today.getMonth());
  }, []);

  useEffect(() => {
    const newLightOliveDays: Date[] = [];
    const newOliveDays: Date[] = [];
    const newMediumOliveDays: Date[] = [];
    const newDarkOliveDays: Date[] = [];
    const newVeryDarkOliveDays: Date[] = [];

    Streakdata.forEach(item => {
      const date = new Date(item.streakDate);
      if (item.totalCount >= 80) {
        newVeryDarkOliveDays.push(date);
      } else if (item.totalCount >= 60) {
        newDarkOliveDays.push(date);
      } else if (item.totalCount >= 40) {
        newMediumOliveDays.push(date);
      } else if (item.totalCount >= 20) {
        newOliveDays.push(date);
      } else {
        newLightOliveDays.push(date);
      }
    });

    setLightOliveDays(newLightOliveDays);
    setOliveDays(newOliveDays);
    setMediumOliveDays(newMediumOliveDays);
    setDarkOliveDays(newDarkOliveDays);
    setVeryDarkOliveDays(newVeryDarkOliveDays);
  }, [Streakdata]);

  const PreviousButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} className="me-5">
      <i className="fi fi-rr-angle-left"></i>
    </button>
  );

  const NextButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>
      <i className="fi fi-rr-angle-right"></i>
    </button>
  );

  const formatCaption = (month: Date) => {
    return format(month, "yyyy년 M월", { locale: ko });
  };

  return (
    <div className="mt-5 w-full flex justify-center mt-5 w-full flex justify-center border-2 border-gray-300 rounded-md p-1">
      <div className="transform scale-90 max-w-[300px] mx-auto">
        <DayPicker
          locale={ko}
          mode="single"
          numberOfMonths={1}
          onMonthChange={handleMonthChange}
          modifiers={{
            lightOlive: lightOliveDays,
            olive: oliveDays,
            mediumOlive: mediumOliveDays,
            darkOlive: darkOliveDays,
            veryDarkOlive: veryDarkOliveDays,
          }}
          modifiersStyles={{
            lightOlive: {
              backgroundColor: "#E6F0B2",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
            },
            olive: {
              backgroundColor: "#C5D887",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
            },
            mediumOlive: {
              backgroundColor: "#A7BC61",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
            },
            darkOlive: {
              backgroundColor: "#728632",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
            },
            veryDarkOlive: {
              backgroundColor: "#425112",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
            },
          }}
          styles={{
            day: defaultStyle,
            selected: {
              backgroundColor: "transparent",
              border: "none",
            },
          }}
          formatters={{
            formatCaption,
          }}
          components={{
            PreviousMonthButton: PreviousButton,
            NextMonthButton: NextButton,
          }}
          className="flex justify-center font-light text-base"
        />
      </div>
    </div>
  );
};

export default StreakCalendar;
