import React, { useRef, useState } from "react";
import BottomSheet from "./BottomSheet";
import Button from "../Button";

interface BottomSheetMemoProps {
  label: string;
}

const BottomSheetMemo: React.FC<BottomSheetMemoProps> = ({ label }) => {
  const [memo, setMemo] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handleButtonClick = () => {
    alert(`입력값: ${memo}`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      if (images.length >= 3) {
        alert("이미지는 3개까지 업로드 할 수 있습니다.");
        return;
      }
      setImages(prevImages => [...prevImages, ...fileArray]);
      e.target.value = "";
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageDelete = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const getPlaceholder = (label: string): string => {
    if (label === "메모") {
      return "책을 읽으면서 떠오르는 생각이나 감정을 간단히 메모해 보세요.";
    } else if (label === "독후감") {
      return "책에 대한 생각이나 감정, 주제나 메시지, 또는 인상 깊었던 장면 등 자유롭게 작성해주세요.";
    }
    return "";
  };

  return (
    <BottomSheet height={700}>
      <div className="flex flex-col items-center justify-center m-[5%]">
        <p className="font-bold text-xl leading-normal my-[10%]">{label} 작성하기</p>
        <textarea
          value={memo}
          onChange={handleMemoChange}
          placeholder={getPlaceholder(label)}
          className="w-[300px] h-[340px] border-2 border-gray-300 p-2 rounded-md outline-none mb-5 font-light text-xs"
        />
        <div className="flex justify-start items-center w-[300px]">
          <div
            onClick={handleIconClick}
            className="me-3 w-[60px] h-[60px] border-2 border-gray-300 p-2 rounded-md outline-none mb-5 flex items-center justify-center"
          >
            <i className="m-0 p-0 fi fi-rr-add-image text-2xl pt-2"></i>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {images.map((image, index) => (
            <div
              key={index}
              className="me-3 w-[60px] h-[60px] border-2 border-gray-300 rounded-md outline-none mb-5 flex items-center justify-center relative overflow-hidden"
            >
              <button
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 w-[20px] h-[20px] flex items-center justify-center text-xs"
              >
                <i className="fi fi-rr-cross-small color-white text-xl pt-2 text-white [text-shadow:_2px_2px_6px_rgb(0_0_0_/_0.1)]"></i>
              </button>
              <img src={image} alt="이미지" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <Button label="작성 완료" onClick={handleButtonClick} />
      </div>
    </BottomSheet>
  );
};

export default BottomSheetMemo;
