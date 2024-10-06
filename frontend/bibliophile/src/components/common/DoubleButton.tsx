import React from "react";

interface ButtonProps {
  firstLabel: string;
  secondLabel: string;
  onFirstClick?: () => void;
  onSecondClick?: () => void;
  disabledFirst?: boolean;
  disabledSecond?: boolean;
}

const DoubleButton: React.FC<ButtonProps> = ({
  firstLabel,
  secondLabel,
  onFirstClick,
  onSecondClick,
  disabledFirst = false,
  disabledSecond = false,
}) => {
  const activeClass = "active:bg-orange active:text-white active:shadow-customInner";
  const disabledClass = "disabled:bg-light-gray disabled:text-black";

  return (
    <div className="flex w-full space-x-4">
      <button
        className={`w-1/2 h-10 rounded-[5px] bg-yellow text-black shadow-custom ${activeClass} ${disabledClass}`}
        onClick={onFirstClick}
        disabled={disabledFirst}
      >
        <span className="text-base font-regular">{firstLabel}</span>
      </button>
      <button
        className={`w-1/2 h-10 rounded-[5px] bg-yellow text-black shadow-custom ${activeClass} ${disabledClass}`}
        onClick={onSecondClick}
        disabled={disabledSecond}
      >
        <span className="text-base font-regular">{secondLabel}</span>
      </button>
    </div>
  );
};

export default DoubleButton;
