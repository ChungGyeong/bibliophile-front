import React, { useState, useEffect, useRef } from "react";

interface SelectBoxProps {
  options: string[];
  defaultOption: string | null;
  onSelect: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, defaultOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const handleClickDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative border-common w-full" ref={selectBoxRef}>
      <div
        className="h-9 px-[10px] flex justify-between items-center"
        onClick={handleClickDropDown}
      >
        <span className="text-sm font-light">{selectedOption || "옵션을 선택해주세요."}</span>
        <i className="fi fi-rr-angle-small-down pt-1 text-gray"></i>
      </div>

      {isOpen && (
        <ul className="absolute w-full bg-white border border-t-0 border-gray rounded-b-[5px] z-1">
          {options.map(option => (
            <li
              key={option}
              className={`h-9 px-[10px] flex items-center text-sm font-light border-t border-gray
                ${selectedOption === option ? "text-black" : "text-gray"}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
