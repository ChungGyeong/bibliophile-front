import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css";

const data = [
  { streakDate: 1, totalCount: 1 },
  { streakDate: 2, totalCount: 1 },
  { streakDate: 10, totalCount: 2 },
  { streakDate: 14, totalCount: 3 },
  { streakDate: 5, totalCount: 1 },
  { streakDate: 6, totalCount: 25 },
];

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

  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number>(9);

  const handleMonthChange = (month: Date) => {
    setSelectedYear(month.getFullYear());
    setSelectedMonth(month.getMonth());
  };

  useEffect(() => {
    const newLightOliveDays: Date[] = [];
    const newOliveDays: Date[] = [];
    const newMediumOliveDays: Date[] = [];
    const newDarkOliveDays: Date[] = [];
    const newVeryDarkOliveDays: Date[] = [];

    data.forEach(item => {
      const date = new Date(selectedYear, selectedMonth, item.streakDate);
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
  }, [selectedYear, selectedMonth]);

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
