import React, { ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";

interface SearchBoxProps {
  value?: string;
  handleChangeSearchBox: ChangeEventHandler<HTMLInputElement>;
  handleClickSearchIcon: React.MouseEventHandler<HTMLButtonElement>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value = "",
  handleChangeSearchBox,
  handleClickSearchIcon,
}) => {
  const navigate = useNavigate();

  const handleBarcodeIconClick = () => {
    navigate("/barcode");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickSearchIcon(e as any);
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

      <button onClick={handleClickSearchIcon}>
        <i className="fi fi-rr-search text-xl" />
      </button>

      <button onClick={handleBarcodeIconClick}>
        <i className="fi fi-rr-barcode-read text-xl" />
      </button>
    </div>
  );
};

export default SearchBox;
