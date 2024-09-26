import React, { useEffect } from "react";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={handleCloseBottomSheet}
      ></div>
      <div
        className={`w-full max-w-[600px] ${getHeightClass()} z-20 fixed bg-white rounded-lg rounded-b-none`}
      >
        <i
          className="fi fi-rr-cross-small p-1 absolute top-[10px] right-[10px] text-[25px] z-30"
          onClick={handleCloseBottomSheet}
        ></i>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
