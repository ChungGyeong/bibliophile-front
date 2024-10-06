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

  return (
    <div className="flex w-full gap-4">
      <div className="flex-grow">
        <InputBox
          type="bold"
          placeholder="검색어를 입력해주세요"
          value={value}
          handleChangeInput={handleChangeSearchBox}
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
