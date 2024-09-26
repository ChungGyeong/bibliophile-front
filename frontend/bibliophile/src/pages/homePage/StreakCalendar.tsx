import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css";

const data = [
  { streakDate: 1, totalCount: 1 },
  { streakDate: 2, totalCount: 1 },
  { streakDate: 10, totalCount: 2 },
  { streakDate: 14, totalCount: 3 },
  { streakDate: 5, totalCount: 1 },
  { streakDate: 6, totalCount: 2 },
];

const defaultStyle: React.CSSProperties = {
  backgroundColor: "#EEEEEE",
  borderRadius: "50%",
  fontSize: "0px",
  pointerEvents: "none",
  width: "25px", // 날짜 셀 크기 조정
  height: "25px",
};

const StreakCalendar: React.FC = () => {
  const [orangeDays, setOrangeDays] = useState<Date[]>([]);
  const [greenDays, setGreenDays] = useState<Date[]>([]);
  const [yellowDays, setYellowDays] = useState<Date[]>([]);

  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number>(8);

  const handleMonthChange = (month: Date) => {
    setSelectedYear(month.getFullYear());
    setSelectedMonth(month.getMonth());
  };

  useEffect(() => {
    const newOrangeDays: Date[] = [];
    const newGreenDays: Date[] = [];
    const newYellowDays: Date[] = [];

    data.forEach(item => {
      const date = new Date(selectedYear, selectedMonth, item.streakDate);
      if (item.totalCount === 1) {
        newOrangeDays.push(date);
      } else if (item.totalCount === 2) {
        newGreenDays.push(date);
      } else if (item.totalCount === 3) {
        newYellowDays.push(date);
      }
    });

    setOrangeDays(newOrangeDays);
    setGreenDays(newGreenDays);
    setYellowDays(newYellowDays);
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

  return (
    <div className="mt-5 w-full flex justify-center mt-5 w-full flex justify-center border-2 border-gray-300 rounded-md p-1">
      {/* 기존의 inline style을 Tailwind CSS로 변환 */}
      <div className="transform scale-90 max-w-[300px] mx-auto">
        <DayPicker
          locale={ko}
          mode="single"
          numberOfMonths={1}
          onMonthChange={handleMonthChange}
          modifiers={{
            orange: orangeDays,
            green: greenDays,
            yellow: yellowDays,
          }}
          modifiersStyles={{
            orange: {
              backgroundColor: "#FFA644",
              borderRadius: "50%",
              width: "25px", // 날짜 셀 크기 줄이기
              height: "25px",
            },
            green: {
              backgroundColor: "#C5D887",
              borderRadius: "50%",
              width: "25px", // 날짜 셀 크기 줄이기
              height: "25px",
            },
            yellow: {
              backgroundColor: "#FFD66C",
              borderRadius: "50%",
              width: "25px", // 날짜 셀 크기 줄이기
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