import React, { useState, useEffect } from "react";

interface SelectBoxProps {
  options: string[];
  defaultOption: string | null;
  onSelect: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, defaultOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  return (
    <div className="border-common w-full">
      <div className="h-9 px-[10px] flex justify-between items-center" onClick={toggleDropdown}>
        <span className="text-sm font-light">{selectedOption || "옵션을 선택해주세요."}</span>
        <i className="fi fi-rr-angle-small-down pt-1 text-gray"></i>
      </div>

      {isOpen && (
        <ul>
          {options.map(option => (
            <li
              key={option}
              className="h-9 px-[10px] flex items-center text-sm font-light text-gray border-t border-gray"
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
