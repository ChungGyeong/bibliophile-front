import React, { useState } from "react";
import BottomSheet from "./BottomSheet";
import Button from "../common/Button";

const BottomSheetPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    alert(`입력값: ${inputValue}`);
  };

  return (
    <BottomSheet height={440} handleCloseBottomSheet={() => {}}>
      <div className="flex flex-col items-center justify-center m-[20%]">
        <p className="font-bold text-xl leading-normal my-[15%]">페이지를 입력하세요</p>
        <input
          type="text"
          placeholder="전체 50p"
          className="border-b-2 border-gray focus:border-black outline-none text-gray-500 text-sm py-2 mb-[30%]"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button label="저장하기" onClick={handleButtonClick} />
      </div>
    </BottomSheet>
  );
};

export default BottomSheetPage;
