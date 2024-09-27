import React from "react";

interface AccountManagementProps {
  handleClickLogout: () => void;
  handleClickDeleteMember: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  handleClickLogout,
  handleClickDeleteMember,
}) => {
  return (
    <div className="flex flex-col items-start justify-center w-full border-soft-gray p-3 border-common">
      <a
        href="https://giant-abrosaurus-6a2.notion.site/10db4836950f801080a1c5eb531acd66?pvs=4"
        className="text-medium-gray text-sm font-light visited:text-medium-gray"
      >
        개인정보 처리방침
      </a>
      <div className="h-[1px] w-full my-1  bg-soft-gray"></div>
      <p onClick={handleClickLogout} className="text-medium-gray text-sm font-light">
        로그아웃
      </p>
      <div className="h-[1px] w-full my-1  bg-soft-gray"></div>
      <p onClick={handleClickDeleteMember} className="text-medium-gray text-sm font-light">
        회원탈퇴
      </p>
    </div>
  );
};

export default AccountManagement;
