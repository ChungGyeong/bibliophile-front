import React from "react";

interface ButtonProps {
  label: string;
  handleClickButton?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, handleClickButton, disabled = false }) => {
  const activeClass = "active:bg-active-orange active:text-white active:shadow-customInner";
  const disabledClass = "disabled:bg-light-gray disabled:text-black";

  return (
    <button
      className={`w-full h-10 rounded-[5px] bg-orange text-black shadow-custom ${activeClass} ${disabledClass}`}
      onClick={handleClickButton}
      disabled={disabled}
    >
      <span className="text-base font-regular">{label}</span>
    </button>
  );
};

export default Button;
