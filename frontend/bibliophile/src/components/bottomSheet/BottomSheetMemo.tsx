import React, { useRef, useState } from "react";
import BottomSheet from "./BottomSheet";
import Button from "../common/Button";

interface MemoImage {
  imgUrl: string;
  createdDate: string;
  lastModifyDate: string;
}

interface BottomSheetMemoProps {
  onClose: () => void;
  label: string;
  mode: string;
  content?: string;
  memoPage?: number;
  memoImgList?: MemoImage[];
}

const BottomSheetMemo: React.FC<BottomSheetMemoProps> = ({
  onClose,
  label,
  mode,
  content = "",
  memoPage = null,
  memoImgList = [],
}) => {
  const [memo, setMemo] = useState<string>(content);
  const [page, setPage] = useState<number>(memoPage);
  const [images, setImages] = useState<MemoImage[]>(memoImgList);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(Number(e.target.value));
  };

  const handleButtonClick = () => {
    alert(`입력값: ${memo}, ${page}, ${images}`);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => ({
        imgUrl: URL.createObjectURL(file),
      }));
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

  const getHeightByLabel = (label: string): string => {
    return label === "메모" ? "h-[290px]" : "h-[340px]";
  };

  return (
    <BottomSheet height={90} onClose={onClose}>
      <div className="flex flex-col items-center justify-center m-[5%] h-full">
        <p className="font-bold text-xl leading-normal mb-[10%]">
          {label} {mode}
        </p>
        <textarea
          value={memo}
          onChange={handleMemoChange}
          placeholder={getPlaceholder(label)}
          className={`w-[90%] ${getHeightByLabel(label)} border-2 border-gray-300 p-2 rounded-md outline-none mb-7 font-light text-xs`}
        />
        {label === "메모" && (
          <input
            type="text"
            placeholder="페이지를 입력해주세요"
            className="w-[80%] border-b-2 border-gray focus:border-black outline-none text-gray-500 text-sm py-3 mb-7"
            value={page}
            onChange={handlePageChange}
          />
        )}
        <div className="flex justify-start items-center w-[90%] h-[10%] my-5">
          <div
            onClick={handleIconClick}
            className="me-4 aspect-square h-full border-2 border-gray-300 p-2 rounded-md outline-none mb-5 flex items-center justify-center"
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
              className="me-4 aspect-square h-full border-2 border-gray-300 rounded-md outline-none mb-5 flex items-center justify-center relative overflow-hidden"
            >
              <button
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 w-[20px] h-[20px] flex items-center justify-center text-xs"
              >
                <i className="fi fi-rr-cross-small color-white text-xl pt-2 text-white [text-shadow:_2px_2px_6px_rgb(0_0_0_/_0.1)]"></i>
              </button>
              <img src={image.imgUrl} alt="이미지" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <Button label="작성 완료" onClick={handleButtonClick} />
      </div>
    </BottomSheet>
  );
};

export default BottomSheetMemo;
