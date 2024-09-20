import React from "react";

interface BottomSheetProps {
  height: number;
  children: React.ReactNode;
  onClose?: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ height, children, onClose }) => {
  const getHeightClass = () => {
    if (height === 90) return "h-[90%]";
    else if (height === 440) return "h-[440px]";
    return "h-[600px]";
  };

  return (
    <div
      className={`w-full ${getHeightClass()} fixed bg-white border border-gray rounded-lg shadow-md`}
    >
      <i
        className="fi fi-rr-cross-small p-1 absolute top-[10px] right-[10px] text-[25px]"
        onClick={onClose}
      ></i>
      {children}
    </div>
  );
};

export default BottomSheet;
