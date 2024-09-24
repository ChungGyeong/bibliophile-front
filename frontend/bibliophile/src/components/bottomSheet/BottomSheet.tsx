import React from "react";

interface BottomSheetProps {
  height: number;
  children: React.ReactNode;
  handleCloseBottomSheet: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ height, children, handleCloseBottomSheet }) => {
  const getHeightClass = () => {
    if (height === 90) return "h-[90%]";
    else if (height === 440) return "h-[440px]";
    return "h-[600px]";
  };

  return (
    // TODO: 배경 div 만들어서 스크롤 없애기, 배경 불투명 검은색으로 -> Modal 참고
    <div
      className={`w-full ${getHeightClass()} z-20 fixed bottom-[60px] bg-white rounded-lg rounded-b-none`}
    >
      <i
        className="fi fi-rr-cross-small p-1 absolute top-[10px] right-[10px] text-[25px] z-30"
        onClick={handleCloseBottomSheet}
      ></i>
      {children}
    </div>
  );
};

export default BottomSheet;
