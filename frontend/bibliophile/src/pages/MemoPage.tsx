import React, { useState, useEffect } from "react";
import BottomSheetMemo from "@/components/bottomSheet/BottomSheetMemo";
import Modal from "react-modal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const data = {
  memoId: 1,
  content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  memoPage: 100,
  createdDate: "2024-02-18 07:53:23.795698",
  lastModifyDate: "2024-02-18 07:53:23.795698",
  memoImgList: [
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ31kw4e5HGBiNACrH0HqtYgMsr9L8vL-CCg&s",
      createdDate: "2024-02-18 07:53:23.795698",
      lastModifyDate: "2024-02-18 07:53:23.795698",
    },
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg79hCHNtmiTI72ahhw8zeb6y9ICYILM60oA&s",
      createdDate: "2024-02-18 07:53:23.795698",
      lastModifyDate: "2024-02-18 07:53:23.795698",
    },
  ],
};

const MemoPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);

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
    alert("뒤로가기");
  };

  const handleClickPencil = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center" onClick={handleClickBack}>
          <i className="fi fi-rr-angle-left text-xl pt-2"></i>
          <p className="font-medium text-xl ml-2 font-semibold pt-1">메모</p>
        </div>
        <button onClick={handleClickPencil} className="pt-2">
          <i className="fi fi-sr-pencil text-orange text-xl pt-2"></i>
        </button>
      </div>

      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {data.memoImgList.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full text-center">
                <img
                  src={image.imgUrl}
                  alt={`사진 ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-4 space-x-2">
        {data.memoImgList.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              currentImageIndex === index ? "bg-orange" : "bg-soft-gray"
            }`}
          ></div>
        ))}
      </div>
      <p className="font-regular text-lg pt-2">... {data.memoPage}p</p>
      <p className="font-light text-lg  leading-6 pt-2">{data.content}</p>
      <p className="font-light text-sm  text-medium-gray pt-2 text-right">
        {data.createdDate.split(" ")[0]}
      </p>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="fixed inset-0 flex items-end justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-t-lg shadow-lg w-full h-[90%] overflow-auto">
          <BottomSheetMemo
            label="메모"
            mode="작성하기"
            content={data.content}
            memoPage={data.memoPage}
            memoImgList={data.memoImgList}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MemoPage;
