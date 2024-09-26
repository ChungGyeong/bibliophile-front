import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomSheetMemo from "@/components/bottomSheet/BottomSheetMemo";
import Modal from "react-modal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const data = {
  bookReportId: 1,
  content:
    "행정각부의 설치·조직과 직무범위는 법률로 정한다. 법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다. \n 국가는 건전한 소비행위를 계도하고 생산품의 품질향상을 촉구하기 위한 소비자보호운동을 법률이 정하는 바에 의하여 보장한다. \n 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다.모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.",
  imgUrl: "string",
  isHost: true,
  bookReportImgList: [
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
    {
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ31kw4e5HGBiNACrH0HqtYgMsr9L8vL-CCg&s",
      createdDate: "2024-02-18 07:53:23.795698",
      lastModifyDate: "2024-02-18 07:53:23.795698",
    },
  ],
  createdDate: "2024-02-18 07:53:23.795698",
  lastModifyDate: "2024-02-18 07:53:23.795698",
  timeStamp: "2024-02-18 07:53:23.795698",
};

const ReportPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const navigate = useNavigate();

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

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center" onClick={handleClickBack}>
          <i className="fi fi-rr-angle-left text-xl pt-2 me-2"></i>
          <p className="font-medium text-xl ml-2 font-semibold pt-1">독후감</p>
        </div>
        <button onClick={handleClickPencil} className="pt-2">
          <i className="fi fi-sr-pencil text-orange text-xl pt-2"></i>
        </button>
      </div>

      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {data.bookReportImgList.map((image, index) => (
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
        {data.bookReportImgList.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              currentImageIndex === index ? "bg-orange" : "bg-soft-gray"
            }`}
          ></div>
        ))}
      </div>
      <p className="font-light text-lg leading-7 pt-4 whitespace-pre-line">{data.content}</p>
      <p className="font-light text-sm text-medium-gray pt-2 text-right">
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
            label="독후감"
            mode="수정하기"
            content={data.content}
            memoImgList={data.bookReportImgList}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ReportPage;
