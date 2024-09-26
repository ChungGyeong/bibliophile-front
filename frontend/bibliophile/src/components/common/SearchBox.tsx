import React, { ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";

interface SearchBoxProps {
  value?: string;
  handleChangeSearchBox: ChangeEventHandler<HTMLInputElement>;
  onUpdatedValue: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value = "",
  handleChangeSearchBox,
  onUpdatedValue,
}) => {
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    if (value) {
      onUpdatedValue(value);
    }
  };
  const handleBarcodeIconClick = () => {
    // TODO: 바코드 페이지로 이동
    navigate("/");
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
          placeholder="검색어를 입력해주세요"
          value={value}
          handleChangeInput={handleChangeSearchBox}
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
