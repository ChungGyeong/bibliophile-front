import React, { useState } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  const activeClass = "active:bg-activeOrange active:text-white active:shadow-customInner";
  const disabledClass = "disabled:bg-lightGray disabled:text-black";

  return (
    <button
      className={`w-full h-10 rounded-[5px] bg-orange text-black shadow-custom ${activeClass} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-base font-regular">{label}</span>
    </button>
  );
};

export default Button;
