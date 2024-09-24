import React, { useState } from "react";
import StarScore from "@/components/review/StarScore.tsx";

interface ReviewCardProps {
  content: string;
  star: number;
  nickname: string;
  type: "list" | "item";
}

const ReviewCard: React.FC<ReviewCardProps> = ({ content, star, nickname, type }) => {
  const [isLong, setIsLong] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // @ts-ignore
  // TODO: 수정 내용 API 요청 시 사용
  const [editedContent, setEditedContent] = useState(content);

  const handleClickCard = () => {
    setIsLong(prev => !prev);
  };

  const handleClickEditButton = () => {
    setIsEdit(prev => !prev);
  };

  const handleChangeContent = () => {
    setEditedContent(content);
  };

  const handleClickSaveButton = () => {
    setIsEdit(false);
    // TODO: 리뷰 수정 API 요청
  };

  const handleClickDeleteButton = () => {
    // TODO: 리뷰 삭제 API 요청
  };

  const renderListType = () => {
    const shortContent = content.length > 20 ? `${content.slice(0, 20)}...` : content;

    return isLong ? (
      <div
        onClick={handleClickCard}
        className="border-common flex flex-col items-center p-3 gap-2.5"
      >
        <div className="flex gap-1 w-full justify-between">
          <StarScore mode="read" score={star} />
          <p className="text-xs font-light text-dark-gray">{nickname}</p>
        </div>
        <p className="text-xs font-light">{content}</p>
      </div>
    ) : (
      <div
        onClick={handleClickCard}
        className="border-common shadow-custom flex items-center gap-2 p-3"
      >
        <StarScore mode="read" score={star} />
        <p className="text-xs font-light">{shortContent}</p>
      </div>
    );
  };

  const renderItemType = () => {
    return isEdit ? (
      <div
        onClick={handleClickCard}
        className="border-common flex flex-col items-center p-3 gap-2.5"
      >
        <div className="flex gap-1 w-full justify-between">
          <StarScore mode="read" score={star} />
          <i className="fi fi-rr-check text-orange" onClick={handleClickSaveButton}></i>
        </div>
        <textarea
          className="border-common text-xs w-full p-2 outline-none focus:border-[1.5px]"
          placeholder="100자 이내로 작성해주세요."
          onChange={handleChangeContent}
        />
      </div>
    ) : (
      <div
        onClick={handleClickCard}
        className="border-common flex flex-col items-center p-3 gap-2.5"
      >
        <div className="flex gap-1 w-full justify-between">
          <StarScore mode="read" score={star} />
          <div>
            <i className="fi fi-rr-pencil mr-2" onClick={handleClickEditButton}></i>
            <i className="fi fi-rr-trash" onClick={handleClickDeleteButton}></i>
          </div>
        </div>
        <p className="text-xs font-light">{content}</p>
      </div>
    );
  };

  return type === "list" ? renderListType() : renderItemType();
};

export default ReviewCard;
