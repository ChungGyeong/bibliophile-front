import React, { useState, useEffect } from "react";

interface InputBoxProps {
  placeholder?: string;
  value?: string;
  onInputChange: (value: string) => void;
  errorMessage?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  placeholder = "입력하세요",
  value = "",
  onInputChange,
  errorMessage,
}) => {
  return (
    <div className="w-full">
      <div className="h-[14px] mb-2">
        {errorMessage && <span className="text-xs text-gray">{errorMessage}</span>}
      </div>
      <input
        type="text"
        value={value}
        onChange={event => onInputChange(event.target.value)}
        placeholder={placeholder}
        className="w-full h-9 text-sm font-light border-common px-[10px]"
      />
    </div>
  );
};

export default InputBox;
