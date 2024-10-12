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
    <div className="relative w-full bg-white z-20" ref={selectBoxRef}>
      <div
        className={`h-9 px-[10px] flex justify-between items-center border border-gray ${isOpen ? "rounded-t-[5px] rounded-b-none" : "rounded-[5px]"} box-border`}
        onClick={handleClickDropDown}
      >
        <span className="text-sm font-light">{selectedOption || "옵션을 선택해주세요."}</span>
        {isOpen ? (
          <i className="fi fi-rr-angle-small-up pt-1 text-dark-gray"></i>
        ) : (
          <i className="fi fi-rr-angle-small-down pt-1 text-gray"></i>
        )}
      </div>

      {isOpen && (
        <ul className="absolute w-full bg-white border border-t-0 border-gray rounded-b-[5px] box-border">
          {options.map((option, index) => (
            <li
              key={option}
              className={`h-9 px-[10px] flex items-center text-sm font-light ${index !== options.length - 1 ? "border-b" : ""} border-gray
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
