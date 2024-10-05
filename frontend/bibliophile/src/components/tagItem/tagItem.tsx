import React from "react";

interface ItemProps {
  label: string;
  selected: boolean;
  handleClickTag?: () => void;
}

const TagItem: React.FC<ItemProps> = ({ label, selected, handleClickTag }) => {
  return (
      <button
          className={`inline-flex justify-center items-center gap-2 py-[6px] px-[8px] rounded-full m-[5px] ${
              selected ? 'bg-orange' : 'bg-light-gray'
          }`}
          onClick={handleClickTag}
      >
        <span className="font-light text-sm leading-normal">{`# ${label}`}</span>
      </button>
  );
};

export default TagItem;