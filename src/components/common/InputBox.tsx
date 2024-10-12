import React, { ChangeEventHandler } from "react";

interface InputBoxProps {
  type?: string;
  placeholder?: string;
  value?: string;
  handleChangeInput: ChangeEventHandler<HTMLInputElement>;
  noticeMessage?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}

const InputBox: React.FC<InputBoxProps> = ({
  type,
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
        className={`w-full h-9 border-common px-[10px] outline-0 ${type === "bold" ? "text-base font-medium" : "text-sm font-light"}`}
      />
    </div>
  );
};

export default InputBox;
