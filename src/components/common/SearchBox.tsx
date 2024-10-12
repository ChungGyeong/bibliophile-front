import React, { ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import { initSearchBookList, loadBookListByTitle } from "@/redux/bookSlice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store.ts";

interface SearchBoxProps {
  value?: string;
  handleChangeSearchBox: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value = "", handleChangeSearchBox }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleBarcodeIconClick = () => {
    navigate("/barcode");
  };

  const handleClickSearchIcon = () => {
    if (value && value.length < 2) alert("두 글자 이상 입력해주세요.");
    if (value) {
      dispatch(initSearchBookList());
      dispatch(loadBookListByTitle({ title: value, page: 0 }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) return;

      handleClickSearchIcon();
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
          onKeyDown={e => handleKeyDown(e)}
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
