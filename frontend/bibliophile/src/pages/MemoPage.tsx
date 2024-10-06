import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMemo, removeMemo } from "@/redux/memoSlice";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { useNavigate, useParams } from "react-router-dom";
import BottomSheetMemo from "@/components/bottomSheet/BottomSheetMemo";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import Modal from "react-modal";
import CustomModal from "@/components/common/Modal";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const MemoPage: React.FC = () => {
  const { memoId } = useParams<{ memoId: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { data, loading } = useSelector((state: RootState) => state.memo);

  const fetchMemoData = () => {
    if (memoId) {
      dispatch(loadMemo(Number(memoId)));
    }
  };

  useEffect(() => {
    fetchMemoData();
  }, [memoId]);

  useEffect(() => {
    if (loading) {
      console.log("로딩 중...");
    } else {
      console.log("로딩 완료");
    }
  }, [loading]);

  const handleModalClose = () => {
    fetchMemoData();
    setIsModalOpen(false);
  };

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickPencil = () => {
    setIsModalOpen(true);
  };

  const handleClickTrash = () => {
    setIsCustomModalOpen(true);
  };

  const handleModalToggle = () => {
    setIsCustomModalOpen(prev => !prev);
  };

  const handleDeleteConfirm = async () => {
    setIsModalOpen(false);
    dispatch(removeMemo(Number(memoId)));
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2">
      {isCustomModalOpen && (
        <CustomModal
          isOpen={isCustomModalOpen}
          handleClickClose={handleModalToggle}
          title="정말로 삭제하시겠습니까?"
          handleClickConfirm={handleDeleteConfirm}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center" onClick={handleClickBack}>
          <i className="fi fi-rr-angle-left text-xl pt-2 me-2"></i>
          <p className="font-medium text-xl ml-2 font-semibold pt-1">메모</p>
        </div>
        <div>
          <button onClick={handleClickPencil} className="pt-2">
            <i className="fi fi-sr-pencil text-orange text-xl pt-2"></i>
          </button>
          <button onClick={handleClickTrash} className="pt-2">
            <i className="fi fi-rr-trash text-orange text-xl pt-2 ml-3"></i>
          </button>
        </div>
      </div>

      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {data?.memoImgUrlList && Array.isArray(data.memoImgUrlList) ? (
            data.memoImgUrlList.map((imgUrl, index) => (
              <CarouselItem key={index}>
                <div className="w-full text-center">
                  <img
                    src={imgUrl}
                    alt={`사진 ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <div>No Images Available</div>
          )}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-4 space-x-2">
        {data?.memoImgUrlList &&
          data.memoImgUrlList.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                currentImageIndex === index ? "bg-orange" : "bg-soft-gray"
              }`}
            ></div>
          ))}
      </div>

      <p className="font-regular text-lg pt-2">
        {data?.memoPage ? `${data.memoPage}p` : "페이지 정보 없음"}
      </p>
      <p className="font-light text-base leading-7 pt-2 whitespace-pre-line">
        {data?.content || "내용 없음"}
      </p>
      <p className="font-light text-sm text-medium-gray pt-2 text-right">
        {data?.createdDate ? data.createdDate.split("T")[0] : "날짜 정보 없음"}
      </p>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="fixed inset-0 flex items-end justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-t-lg shadow-lg w-full h-[90%] overflow-auto">
          <BottomSheet height={90} handleCloseBottomSheet={() => setIsModalOpen(false)}>
            <BottomSheetMemo
              label="메모"
              mode="수정하기"
              memoId={Number(memoId)}
              content={data?.content}
              memoPage={data?.memoPage}
              memoImgList={data?.memoImgUrlList}
              onClose={handleModalClose}
            />
          </BottomSheet>
        </div>
      </Modal>
    </div>
  );
};

export default MemoPage;
