import React, { useState } from "react";

interface ItemProps {
  label: string;
  disabled?: boolean;
  initialSelect?: boolean;
}

const tagItem: React.FC<ItemProps> = ({
  label,
  disabled = false,
  initialSelect = false,
}) => {
  const [select, setSelect] = useState<boolean>(initialSelect);

  const onClick = () => {
    if (!disabled) {
      setSelect(!select);
    }
  }

  const getButtonClass = () => {
    return select ? "bg-activeOrange" : "bg-lightGray";
  };

  return (
    <button className={`button ${getButtonClass()} inline-flex justify-center items-center gap-2 py-[6px] px-[8px] rounded-full`} onClick={onClick} disabled={disabled}>
      <span className="font-light text-[14px] leading-normal">
        {label}
      </span>
    </button>
  );
};

export default tagItem;