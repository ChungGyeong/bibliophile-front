import React from "react";

interface UserInfoFieldProps {
  isEdit: boolean;
  firstTitle: string;
  firstContent: string;
  secondTitle: string;
  secondContent: string;
}

const UserInfoField: React.FC<UserInfoFieldProps> = ({
  isEdit,
  firstTitle,
  firstContent,
  secondTitle,
  secondContent,
}) => {
  return (
    <div
      className={`w-full flex flex-col justify-center items-start rounded-[5px] p-5 ${isEdit ? "bg-light-gray" : "bg-light-yellow"}`}
    >
      <div>
        <span className="font-medium text-base text-center">{firstTitle}</span>
        <span className="font-regular text-base text-center">{firstContent}</span>
      </div>
      <div className={`h-[1px] w-full my-1  ${isEdit ? "bg-gray" : "bg-yellow"}`}></div>
      <div>
        <span className="font-medium text-base text-center">{secondTitle} </span>
        <span className="font-regular text-base text-center">{secondContent}</span>
      </div>
    </div>
  );
};

export default UserInfoField;
