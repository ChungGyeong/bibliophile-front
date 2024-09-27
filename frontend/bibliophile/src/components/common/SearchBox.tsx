import React, { ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";

interface SearchBoxProps {
  value?: string;
  handleChangeSearchBox: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value = "", handleChangeSearchBox }) => {
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    if (value) {
      // TODO: API 호출
    }
  };
  const handleBarcodeIconClick = () => {
    // TODO: 바코드 페이지로 이동
    navigate("/barcode");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchIconClick();
    }
  };

  return (
    <div className="flex w-full gap-4">
      <div className="flex-grow">
        <InputBox
          type="bold"
          placeholder="검색어를 입력해주세요"
          value={value}
          handleChangeInput={handleChangeSearchBox}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button onClick={handleSearchIconClick}>
        <i className="fi fi-rr-search text-xl" />
      </button>

      <button onClick={handleBarcodeIconClick}>
        <i className="fi fi-rr-barcode-read text-xl" />
      </button>
    </div>
  );
};

export default SearchBox;
