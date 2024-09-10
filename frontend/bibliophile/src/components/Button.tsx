import React, { useState } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled=false }) => {

  const baseClass = 'w-full h-10 rounded-[5px] bg-orange text-black shadow-custom';
  const activeClass = 'active:bg-activeOrange active:text-white active:shadow-customInner';
  const disabledClass = 'disabled:bg-lightGray disabled:text-black';
  const buttonClass = `${baseClass} ${activeClass} ${disabledClass}`;

  const textClass = 'text-base font-regular';

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={textClass}>
        {label}
      </span>
    </button>
  );
};

export default Button;