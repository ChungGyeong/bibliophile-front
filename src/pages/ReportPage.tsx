import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadReport, removeReport } from "@/redux/reportSlice";
import { AppDispatch, RootState } from "@/redux/store.ts";
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

const ReportPage: React.FC = () => {
  const { bookReportId } = useParams<{ bookReportId: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { data, loading } = useSelector((state: RootState) => state.report);

  const fetchReportData = () => {
    if (bookReportId) {
      dispatch(loadReport(Number(bookReportId)));
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [bookReportId]);

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

  const handleModalClose = () => {
    fetchReportData();
    setIsModalOpen(false);
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
    dispatch(removeReport(Number(bookReportId)));
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
          <p className="font-medium text-xl ml-2 font-semibold pt-1">독후감</p>
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
          {Array.isArray(data.bookReportImgUrlList) && data.bookReportImgUrlList.length > 0
            ? data.bookReportImgUrlList.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="w-full text-center">
                    <img
                      src={image}
                      alt={`사진 ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))
            : null}
        </CarouselContent>
      </Carousel>

      {Array.isArray(data.bookReportImgUrlList) && data.bookReportImgUrlList.length > 0 ? (
        <div className="flex justify-center mt-4 space-x-2">
          {data.bookReportImgUrlList.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                currentImageIndex === index ? "bg-orange" : "bg-soft-gray"
              }`}
            ></div>
          ))}
        </div>
      ) : null}

      <p className="font-light text-lg leading-7 pt-4 whitespace-pre-line">
        {data.content || "No Content Available"}
      </p>

      <p className="font-light text-sm text-medium-gray pt-2 text-right">
        {data.createdDate ? data.createdDate.split("T")[0] : "No Date Available"}
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
              label="독후감"
              mode="수정하기"
              bookReportId={Number(bookReportId)}
              content={data.content}
              memoImgList={data.bookReportImgUrlList}
              onClose={handleModalClose}
            />
          </BottomSheet>
        </div>
      </Modal>
    </div>
  );
};

export default ReportPage;
