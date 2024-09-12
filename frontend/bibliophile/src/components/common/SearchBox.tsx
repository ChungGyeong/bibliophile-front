import React from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onInputChange: (value: string) => void;
  searchRoute?: string;
  barcodeRoute?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "검색어를 입력해주세요.",
  value = "",
  onInputChange,
  searchRoute = "/search",
  barcodeRoute = "/barcode",
}) => {
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    if (value) {
      navigate(`${searchRoute}?query=${value}`);
    }
  };
  const handleBarcodeIconClick = () => {
    navigate(barcodeRoute);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchIconClick();
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex-grow">
        <InputBox
          placeholder={placeholder}
          value={value}
          onInputChange={onInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex ml-[20px] pt-1">
        <button onClick={handleSearchIconClick}>
          <i className="fi fi-rr-search mr-[10px]" />
        </button>

        <button onClick={handleBarcodeIconClick}>
          <i className="fi fi-rr-barcode-read" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
