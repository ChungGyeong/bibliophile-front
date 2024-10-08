import React, { useState } from "react";
import StarScore from "@/components/review/StarScore.tsx";
import Modal from "@/components/common/Modal.tsx";
import { useDispatch } from "react-redux";
import { removeReview, editReview } from "@/redux/reviewSlice";
import { AppDispatch } from "@/redux/store.ts";

interface ReviewCardProps {
  reviewId: number;
  content: string;
  star: number;
  nickname: string;
  type: "list" | "item";
  reload?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewId,
  content,
  star,
  nickname,
  type,
  reload,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [score, setScore] = useState(star);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  // @ts-ignore
  // TODO: 수정 내용 API 요청 시 사용
  const [editedContent, setEditedContent] = useState(content);

  const handleClickCard = () => {
    setIsLong(prev => !prev);
  };

  const handleClickEditButton = () => {
    setIsEdit(prev => !prev);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputReview = e.target.value;

    if (inputReview.length > 100) {
      setModalMessage("최대 100자까지 입력 가능합니다.");
      setIsModalOpen(true);
    } else {
      setEditedContent(inputReview);
    }
  };

  const handleClickSaveButton = async () => {
    if (!editedContent) {
      setModalMessage("내용을 입력해주세요.");
      setIsModalOpen(true);
      return;
    }

    const updateData = {
      content: editedContent,
      star: score,
    };
    await dispatch(editReview({ reviewId, updateData }));
    await reload?.();
    setIsEdit(false);
  };

  const handleClickDeleteButton = () => {
    dispatch(removeReview(reviewId));
    setIsOpenModal(!isOpenModal);
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
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
        <p className="text-xs font-light text-left w-full">{content}</p>
      </div>
    ) : (
      <div
        onClick={handleClickCard}
        className="border-common shadow-custom flex items-center gap-2 p-3"
      >
        <StarScore mode="read" score={star} />
        <p className="text-xs font-light text-left w-full">{shortContent}</p>
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
          <StarScore mode="write" score={star} onChangeScore={handleScoreChange} mini={true} />
          <i className="fi fi-rr-check text-orange" onClick={handleClickSaveButton}></i>
        </div>
        <textarea
          className="border-common text-xs w-full p-2 outline-none focus:border-[1.5px]"
          placeholder="100자 이내로 작성해주세요."
          onChange={handleChangeContent}
          value={editedContent}
        />

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            handleClickClose={() => setIsModalOpen(false)}
            title={modalMessage}
            handleClickConfirm={() => setIsModalOpen(false)}
          />
        )}
      </div>
    ) : (
      <div
        onClick={handleClickCard}
        className="border-common flex flex-col items-center p-3 gap-2.5"
      >
        {isOpenModal && (
          <Modal
            title="정말 삭제 하시겠습니까?"
            isOpen={isOpenModal}
            handleClickClose={() => setIsOpenModal(false)}
            handleClickConfirm={handleClickDeleteButton}
          />
        )}
        <div className="flex gap-1 w-full justify-between">
          <StarScore mode="read" score={star} />
          <div>
            <i className="fi fi-rr-pencil mr-2" onClick={handleClickEditButton}></i>
            <i className="fi fi-rr-trash" onClick={() => setIsOpenModal(true)}></i>
          </div>
        </div>
        <p className="text-xs font-light text-left w-full">{content}</p>
      </div>
    );
  };

  return type === "list" ? renderListType() : renderItemType();
};

export default ReviewCard;
