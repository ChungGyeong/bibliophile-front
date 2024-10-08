import React from "react";
import { useNavigate } from "react-router-dom";

interface AccountManagementProps {
  handleClickLogout: () => void;
  handleClickDeleteMember: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  handleClickLogout,
  handleClickDeleteMember,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-center w-full border-soft-gray p-3 border-common">
      <p
        onClick={() => {
          navigate("/privacy-policy");
        }}
        className="text-medium-gray text-sm font-light visited:text-medium-gray cursor-pointer"
      >
        개인정보 처리방침
      </p>
      <div className="h-[1px] w-full my-1  bg-soft-gray"></div>
      <p onClick={handleClickLogout} className="text-medium-gray text-sm font-light cursor-pointer">
        로그아웃
      </p>
      <div className="h-[1px] w-full my-1  bg-soft-gray"></div>
      <p
        onClick={handleClickDeleteMember}
        className="text-medium-gray text-sm font-light cursor-pointer"
      >
        회원탈퇴
      </p>
    </div>
  );
};

export default AccountManagement;
