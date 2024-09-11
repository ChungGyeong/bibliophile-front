import React from "react";

interface BottomSheetProps {
  height: number;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ height, children }) => {
  const getHeightClass = () => {
    if (height === 700) return "h-[700px]";
    else if (height === 440) return "h-[440px]";
    return "h-[600px]";
  };

  const handleClose = () => {
    alert("닫기");
  };

  return (
    <div
      className={`w-[360px] ${getHeightClass()} fixed bg-white border border-gray rounded-lg shadow-md`}
    >
      <i
        className="fi fi-rr-cross-small p-1 absolute top-[10px] right-[10px]"
        onClick={handleClose}
      ></i>
      {children}
    </div>
  );
};

export default BottomSheet;
