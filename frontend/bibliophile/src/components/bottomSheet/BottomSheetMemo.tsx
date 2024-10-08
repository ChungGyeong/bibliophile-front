import React, { useRef, useState } from "react";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { editMemo, addMemo } from "@/redux/memoSlice";
import { editReport, addReport } from "@/redux/reportSlice";
import { addImage } from "@/redux/imageSlice";
import { AppDispatch } from "@/redux/store.ts";
import Modal from "@/components/common/Modal";

interface BottomSheetMemoProps {
  onClose: () => void;
  myBookId?: number;
  memoId?: number;
  bookReportId?: number;
  label: string;
  mode: string;
  content?: string;
  memoPage?: number;
  memoImgList?: string[];
}

const BottomSheetMemo: React.FC<BottomSheetMemoProps> = ({
  onClose,
  myBookId = 0,
  memoId = 0,
  bookReportId = 0,
  label,
  mode,
  content = "",
  memoPage = 0,
  memoImgList = [],
}) => {
  const [memo, setMemo] = useState<string>(content);
  const [page, setPage] = useState<number>(memoPage);
  const [existingImages, setExistingImages] = useState<string[]>(memoImgList);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch: AppDispatch = useDispatch();

  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue < 0) {
      setPage(0);
    } else {
      setPage(inputValue);
    }
  };

  const handleButtonClick = async () => {
    if (memo.length > 400) {
      alert("400자 이하로 작성해주세요!");
      return;
    }

    const formData = new FormData();

    if (filesToUpload.length > 0) {
      filesToUpload.forEach(file => formData.append("files", file));
    }

    let uploadedImageUrls: string[] = [];

    if (filesToUpload.length > 0) {
      const result = await dispatch(addImage(formData));
      if (result.payload && Array.isArray(result.payload)) {
        uploadedImageUrls = result.payload.map(item => item.url);
      } else {
        console.error("Error: Payload data is not an array or undefined", result.payload);
        return;
      }
    }

    const finalImages = [...existingImages, ...uploadedImageUrls];

    if (label === "메모") {
      if (mode === "작성하기") {
        const createData = {
          myBookId: myBookId,
          memoPage: page,
          content: memo,
          memoImgUrl: finalImages,
        };
        await dispatch(addMemo(createData));
      } else {
        const updateData = {
          memoPage: page,
          content: memo,
          memoImgUrl: finalImages,
        };
        await dispatch(editMemo({ memoId, updateData }));
      }
    } else {
      if (mode === "작성하기") {
        const createData = {
          myBookId: myBookId,
          content: memo,
          ImgUrl: finalImages,
        };
        await dispatch(addReport(createData));
      } else {
        const updateData = {
          content: memo,
          bookReportImgUrl: finalImages,
        };
        await dispatch(editReport({ bookReportId, updateData }));
      }
    }

    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);

      for (const file of fileArray) {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          setModalMessage(
            `${file.name}은(는) 지원하지 않는 형식입니다. JPG, JPEG, PNG 형식만 업로드 가능합니다.`
          );
          setIsModalOpen(true);
          return;
        }

        if (file.size > MAX_FILE_SIZE) {
          setModalMessage(`${file.name}은(는) 파일 크기가 2MB를 초과하였습니다.`);
          setIsModalOpen(true);
          return;
        }
      }

      if (existingImages.length + newImages.length + fileArray.length > 3) {
        setModalMessage("이미지는 3개까지 업로드 할 수 있습니다.");
        setIsModalOpen(true);
        return;
      }

      const previewUrls = fileArray.map(file => URL.createObjectURL(file));
      setNewImages(prev => [...prev, ...previewUrls]);
      setFilesToUpload(prev => [...prev, ...fileArray]);
      e.target.value = "";
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageDelete = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setExistingImages(prevImages => prevImages.filter((_, i) => i !== index));
    } else {
      setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
      setFilesToUpload(prevFiles => prevFiles.filter((_, i) => i !== index));
    }
  };

  const getPlaceholder = (label: string): string => {
    if (label === "메모") {
      return "책을 읽으면서 떠오르는 생각이나 감정을 간단히 메모해 보세요. (최대 400자)";
    } else if (label === "독후감") {
      return "책에 대한 생각이나 감정, 주제나 메시지, 또는 인상 깊었던 장면 등 자유롭게 작성해주세요. (최대 400자)";
    }
    return "";
  };

  const getHeightByLabel = (label: string): string => {
    return label === "메모" ? "h-1/3" : "h-1/2";
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center m-[5%] h-full pb-[75px] px-[5%]">
      <p className="font-bold text-xl leading-normal mb-[10%]">
        {label} {mode}
      </p>
      <textarea
        value={memo}
        onChange={handleMemoChange}
        placeholder={getPlaceholder(label)}
        className={`w-full ${getHeightByLabel(label)} border-2 border-gray-300 p-2 rounded-md outline-none mb-6 font-light text-xs`}
      />
      {label === "메모" && (
        <input
          type="number"
          placeholder="페이지를 숫자로 입력해주세요"
          className="w-full border-b-2 focus:border-black outline-none text-gray-500 text-sm py-3 mb-6"
          value={page === 0 ? "" : page}
          onChange={handlePageChange}
        />
      )}
      <div className="flex justify-start items-center w-full h-[10%] my-3">
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

        {existingImages.map((image, index) => (
          <div
            key={index}
            className="me-4 aspect-square h-full border-2 border-gray-300 rounded-md outline-none mb-5 flex items-center justify-center relative overflow-hidden"
          >
            <button
              onClick={() => handleImageDelete(index, true)}
              className="absolute top-0 right-0 w-[20px] h-[20px] flex items-center justify-center text-xs"
            >
              <i className="fi fi-rr-cross-small color-white text-xl pt-2 text-white [text-shadow:_2px_2px_6px_rgb(0_0_0_/_0.1)]"></i>
            </button>
            <img src={image} alt="이미지" className="w-full h-full object-cover" />
          </div>
        ))}
        {newImages.map((image, index) => (
          <div
            key={index}
            className="me-4 aspect-square h-full border-2 border-gray-300 rounded-md outline-none mb-5 flex items-center justify-center relative overflow-hidden"
          >
            <button
              onClick={() => handleImageDelete(index, false)}
              className="absolute top-0 right-0 w-[20px] h-[20px] flex items-center justify-center text-xs"
            >
              <i className="fi fi-rr-cross-small color-white text-xl pt-2 text-white [text-shadow:_2px_2px_6px_rgb(0_0_0_/_0.1)]"></i>
            </button>
            <img src={image} alt="이미지" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <Button label="작성 완료" handleClickButton={handleButtonClick} />

      <Modal
        isOpen={isModalOpen}
        handleClickClose={closeModal}
        title={modalMessage}
        handleClickConfirm={closeModal}
      />
    </div>
  );
};

export default BottomSheetMemo;
