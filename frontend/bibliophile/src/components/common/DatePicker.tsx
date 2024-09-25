import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { formatDateToString } from "@/utils/calDate.ts";

interface DatePickerProps {
  handleChangeDate: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ handleChangeDate }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClickDropDown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (date) {
      handleChangeDate(date);
    }
  }, [date]);

  return (
    <div className="relative w-full border-common">
      <div
        className="h-9 px-[10px] text-sm font-light flex cursor-pointer justify-between items-center"
        onClick={handleClickDropDown}
      >
        <span className={`${date ? "text-dark-gray" : "text-gray"} text-sm font-light`}>
          {date ? formatDateToString(date) : "생일을 선택해주세요."}
        </span>
        {isOpen ? (
          <i className="fi fi-rr-angle-small-up pt-1 text-dark-gray"></i>
        ) : (
          <i className="fi fi-rr-angle-small-down pt-1 text-gray"></i>
        )}
      </div>
      {isOpen && (
        <Calendar
          mode="single"
          selected={date}
          onSelect={selectedDate => {
            setDate(selectedDate);
            setIsOpen(false);
          }}
          className="absolute w-full rounded-t-[5px] rounded-b-none bg-white border-common"
        />
      )}
    </div>
  );
};

export default DatePicker;
