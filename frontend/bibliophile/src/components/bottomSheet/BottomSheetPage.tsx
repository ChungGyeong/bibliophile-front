import React, { useState } from "react";
import Button from "../common/Button";

interface BottomSheetPageProps {
  onSave: (page: number) => void;
  totalPage: number;
}

const BottomSheetPage: React.FC<BottomSheetPageProps> = ({ onSave, totalPage }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    const pageNumber = parseInt(inputValue);
    if (!isNaN(pageNumber) && pageNumber <= totalPage) {
      onSave(pageNumber);
    } else {
      alert(`올바른 페이지 번호를 입력해주세요 (1 - ${totalPage}p)`);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center m-[20%]">
        <p className="font-bold text-xl leading-normal my-[15%]">페이지를 입력하세요</p>
        <input
          type="text"
          placeholder={`전체 ${totalPage}p`}
          className="border-b-2 border-gray focus:border-black outline-none text-gray-500 text-sm py-2 mb-[30%]"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button label="저장하기" handleClickButton={handleButtonClick} />
      </div>
    </div>
  );
};

export default BottomSheetPage;
