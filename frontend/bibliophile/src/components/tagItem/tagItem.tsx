import React from "react";

interface ItemProps {
  label: string;
  disabled?: boolean;
  selected: boolean;
  onClick?: () => void;
}

const tagItem: React.FC<ItemProps> = ({ label, disabled = false, selected, onClick }) => {
  const getButtonClass = () => {
    return selected ? "bg-orange" : "bg-light-gray";
  };

  return (
    <button
      className={`button ${getButtonClass()} inline-flex justify-center items-center gap-2 py-[6px] px-[8px] rounded-full m-[5px]`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="font-light text-sm leading-normal">{label}</span>
    </button>
  );
};

export default tagItem;
