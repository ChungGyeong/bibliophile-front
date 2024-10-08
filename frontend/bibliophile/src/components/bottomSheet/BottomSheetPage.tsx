import React, { useState } from "react";
import Button from "../common/Button";

interface BottomSheetPageProps {
  onSave: (page: number) => void;
  totalPage: number;
}

const BottomSheetPage: React.FC<BottomSheetPageProps> = ({ onSave, totalPage }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setErrorMessage("");
  };

  const handleButtonClick = () => {
    const pageNumber = parseInt(inputValue);

    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPage) {
      setErrorMessage(`올바른 페이지를 입력해주세요. 1 - ${totalPage}p`);
      return;
    } else if (pageNumber < 1) {
      setErrorMessage("페이지 번호는 1 이상이어야 합니다.");
      return;
    } else if (pageNumber > totalPage) {
      setErrorMessage(`페이지 번호는 ${totalPage} 이하여야 합니다.`);
      return;
    }
    onSave(pageNumber);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center m-[20%]">
        <p className="font-bold text-xl leading-normal my-[15%]">페이지를 입력하세요</p>
        <input
          type="number"
          placeholder={`전체 ${totalPage}p`}
          className="w-full border-b-2 focus:border-black outline-none text-gray-500 text-sm py-2"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="h-4">
          {errorMessage && <p className="text-orange text-xs mt-1">{errorMessage}</p>}
        </div>
        <div className="mt-12 w-full">
          <Button label="저장하기" handleClickButton={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default BottomSheetPage;
