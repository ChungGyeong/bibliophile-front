import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadFox, editFoxFeed } from "@/redux/foxSlice";
import ProgressBar from "@/components/common/ProgressBar";
import Modal from "@/components/common/Modal";

const FoxHouse: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fox, error } = useSelector((state: RootState) => state.fox);
  const [isFeeding, setIsFeeding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderFoxImg = () => {
    if (isFeeding) {
      return fox.foxType === "ADULT"
        ? `/images/fox/youth_eat.gif`
        : `/images/fox/${fox.foxType.toLowerCase()}_eat.gif`;
    } else if (fox.foxType === "BABY") {
      return `/images/fox/baby_${fox.foxStatus.toLowerCase()}.gif`;
    } else if (fox.foxType === "YOUTH") {
      return `/images/fox/youth_${fox.foxStatus.toLowerCase()}.gif`;
    } else if (fox.foxType === "ADULT") {
      return `/images/fox/youth_${fox.foxStatus.toLowerCase()}.gif`;
    }
  };

  const renderStatusIcon = () => {
    if (fox.foxStatus === "GOOD") {
      return { iconClass: "fi fi-rr-smile-beam", label: "행복함" };
    } else if (fox.foxStatus === "BAD") {
      return { iconClass: "fi fi-rr-sad-tear", label: "배고픔" };
    }
  };

  const status = renderStatusIcon();

  // const handleFeedBtnClick = async () => {
  //   setIsFeeding(true);
  //   try {
  //     await dispatch(editFoxFeed()).unwrap();
  //     setTimeout(() => {
  //       setIsFeeding(false);
  //       dispatch(loadFox());
  //     }, 3000);
  //   } catch (error) {
  //     setIsFeeding(false);
  //   }
  // };

  const handleFeedBtnClick = async () => {
    if (fox.feedCount <= 0) {
      setIsModalOpen(true);
      return;
    }
    setIsFeeding(true);
    try {
      await dispatch(editFoxFeed()).unwrap();
      setTimeout(() => {
        setIsFeeding(false);
        dispatch(loadFox());
      }, 3000);
    } catch (error) {
      setIsFeeding(false);
    }
  };

  useEffect(() => {
    dispatch(loadFox());
  }, [dispatch]);

  if (error) return <div>ERROR: {error}</div>;

  return (
    <div className="w-full h-[280px] shadow-custom border rounded-[5px]">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          handleClickClose={() => setIsModalOpen(false)}
          title="여우에게 줄 밥이 없어요!"
          handleClickConfirm={() => setIsModalOpen(false)}
        />
      )}

      <div className="h-[200px] flex items-center justify-center">
        <img src={renderFoxImg()} alt="여우" className="h-full" />
      </div>

      <div className="h-[80px] bg-orange rounded-b-[5px] flex items-center justify-between px-5">
        <div className="flex flex-col items-center">
          <div className="w-[40px] h-[40px] rounded-[5px] bg-white shadow-custom flex items-center justify-center pt-2">
            <i className={`${status?.iconClass} text-active-orange text-[26px]`} />
          </div>
          <div className="text-xs font-medium text-white mt-1">{status?.label}</div>
        </div>

        <div className="w-[160px] flex flex-col items-center">
          <span className="text-white text-sm font-medium">Lv {fox.level}</span>
          <ProgressBar isThin={false} percent={fox.percent} />
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleFeedBtnClick}
            className="w-[40px] h-[40px] rounded-[5px] bg-white shadow-custom active:shadow-custom-inner flex items-center justify-center"
          >
            <i className="fi fi-rr-restaurant text-active-orange text-[26px] flex items-center justify-center" />
          </button>
          <div className="text-xs font-medium text-white mt-1">
            {fox.feedCount >= 1000 ? "999..." : fox.feedCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoxHouse;
