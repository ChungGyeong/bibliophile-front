import React, { ChangeEventHandler } from "react";

interface InputBoxProps {
  placeholder?: string;
  value?: string;
  handleChangeInput: ChangeEventHandler<HTMLInputElement>;
  noticeMessage?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  placeholder = "입력하세요",
  value = "",
  handleChangeInput,
  noticeMessage,
  onKeyDown,
}) => {
  return (
    <div className="w-full relative">
      {noticeMessage && <span className="text-xs text-gray absolute -top-4">{noticeMessage}</span>}
      <input
        type="text"
        value={value}
        onChange={handleChangeInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full h-9 text-sm font-light border-common px-[10px] outline-0"
      />
    </div>
  );
};

export default InputBox;
