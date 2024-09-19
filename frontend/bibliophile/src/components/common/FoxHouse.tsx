import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

interface FoxData {
  foxId: number;
  level: number;
  foxType: string;
  exp: number;
  feedCount: number;
  foxStatus: string;
}

const FoxHouse: React.FC<FoxData> = ({ foxId, level, foxType, exp, feedCount, foxStatus }) => {
  const [currentFeedCount, setCurrentFeedCount] = useState(feedCount);

  const renderFoxStatus = () => {
    // TODO: 현재는 이모지이지만, 추후 이미지로 바꾸어야 함
    // TODO: 또한 BE와 상의하여 foxType 결과에 대해 이야기하고, 맞춰 수정해야 함 (현재는 임의값)
    if (foxType === "BABY" && foxStatus === "GOOD") {
      return "🐰";
    } else if (foxType === "BABY" && foxStatus === "BAD") {
      return "🐹";
    } else if (foxType === "YOUTH" && foxStatus === "GOOD") {
      return "🐶";
    } else if (foxType === "YOUTH" && foxStatus === "BAD") {
      return "🐔";
    } else if (foxType === "ADULT" && foxStatus === "GOOD") {
      return "🦊";
    } else if (foxType === "ADULT" && foxStatus === "BAD") {
      return "😻";
    }
    return "💥";
  };

  const renderStatusIcon = () => {
    if (foxStatus === "GOOD") {
      return { iconClass: "fi fi-rr-smile-beam", label: "행복함" };
    } else if (foxStatus === "BAD") {
      return { iconClass: "fi fi-rr-sad-tear", label: "배고픔" };
    }
  };

  const status = renderStatusIcon();

  const handleFeedBtnClick = () => {
    if (currentFeedCount >= 1) {
      // TODO: 밥 먹이기 API POST
      // TODO: 요청이 제대로 갔을 시 API GET 하여 setCurrentFeedCount로 밥 남은 것 업데이트
    }
  };

  return (
    <div className="w-full h-[280px] shadow-custom border rounded-[5px]">
      <div className="h-[200px] flex items-center justify-center">{renderFoxStatus()}</div>

      <div className="h-[80px] bg-orange rounded-b-[5px] flex items-center justify-between px-5">
        <div className="flex flex-col items-center">
          <div className="w-[40px] h-[40px] rounded-[5px] bg-white shadow-custom flex items-center justify-center pt-2">
            <i className={`${status?.iconClass} text-active-orange text-[26px]`} />
          </div>
          <div className="text-xs font-medium text-white mt-1">{status?.label}</div>
        </div>

        <div className="w-[160px] flex flex-col items-center">
          <span className="text-white text-sm font-medium">Lv {level}</span>
          {/* TODO: 프로그레스바 최대 경험치 기준 어떻게 받을지에 따라 마저 작성 */}
          <ProgressBar isThin={false} percent={exp} />
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleFeedBtnClick}
            className="w-[40px] h-[40px] rounded-[5px] bg-white shadow-custom active:shadow-custom-inner flex items-center justify-center"
          >
            <i className="fi fi-rr-restaurant text-active-orange text-[26px] flex items-center justify-center" />
          </button>
          <div className="text-xs font-medium text-white mt-1">{currentFeedCount} / 10</div>
        </div>
      </div>
    </div>
  );
};

export default FoxHouse;
