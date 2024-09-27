import React, { useRef, useState } from "react";
import { ClassificationType, UsersResponse } from "@/types/user.ts";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import InputBox from "@/components/common/InputBox.tsx";
import Button from "@/components/common/Button.tsx";
import Modal from "@/components/common/Modal.tsx";
import AccountManagement from "@/pages/myPage/AccountManagement.tsx";

const user: UsersResponse = {
  userId: 12345,
  email: "example@example.com",
  nickname: "빌리",
  gender: "MAN",
  birthday: "1990-05-20",
  classification: ["LITERATURE", "PHILOSOPHY", "ARTS"],
  profileImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSjC7La64XiIZjifQW3gNvr6LwDE4vI_iCvQ&s",
  oauthServerType: "KAKAO",
};

const MyPage: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState<UsersResponse>({
    userId: user.userId,
    email: user.email,
    nickname: user.nickname,
    gender: user.gender,
    birthday: user.birthday,
    classification: user.classification,
    profileImage: user.profileImage,
    oauthServerType: user.oauthServerType,
  });
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [isOpenDeleteMemberModal, setIsOpenDeleteMemberModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickProfileImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newImageSrc = URL.createObjectURL(files[0]);
      setInputs((prev: UsersResponse) => ({ ...prev, profileImage: newImageSrc }));
    }
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: UsersResponse) => ({ ...prev, nickname: e.target.value }));
  };

  const handleChangeClassification = (selectedTags: Set<string>) => {
    const validClassifications: ClassificationType[] = Array.from(selectedTags).filter(tag =>
      [
        "GENERAL_WORKS",
        "PHILOSOPHY",
        "RELIGION",
        "SOCIAL_SCIENCES",
        "NATURAL_SCIENCES",
        "TECHNOLOGY",
        "ARTS",
        "LANGUAGE",
        "LITERATURE",
        "HISTORY",
      ].includes(tag)
    ) as ClassificationType[];

    setInputs((prev: UsersResponse) => ({
      ...prev,
      classification: validClassifications,
    }));
  };

  const handleClickButton = () => {
    setIsEdit(!isEdit);
    console.log(inputs);
  };

  const handleClickLogout = () => {
    setIsOpenLogoutModal(!isOpenLogoutModal);
  };

  const handleClickDeleteMember = () => {
    setIsOpenDeleteMemberModal(!isOpenDeleteMemberModal);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${isEdit ? "gap-4" : "gap-4"}`}
    >
      {isOpenLogoutModal && (
        <Modal
          title="정말 로그아웃 하시겠어요?"
          isOpen={isOpenLogoutModal}
          handleClickClose={handleClickLogout}
          handleClickConfirm={() => {}}
        />
      )}
      {isOpenDeleteMemberModal && (
        <Modal
          title="정말 탈퇴 하시겠어요?"
          isOpen={isOpenDeleteMemberModal}
          handleClickClose={handleClickDeleteMember}
          handleClickConfirm={() => {}}
        />
      )}
      {isEdit ? (
        <div>
          <div>
            <img
              className="w-[120px] h-[120px] rounded-md object-cover mt-10 mb-2.5"
              onClick={handleClickProfileImage}
              src={inputs.profileImage}
              alt={`${user.nickname}의 프로필 이미지`}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }} // input 숨기기
              onChange={handleChangeImageFiles}
            />
          </div>
          <div className="w-[120px] h-[28px]">
            <InputBox
              type="bold"
              value={inputs.nickname}
              placeholder={inputs.nickname}
              handleChangeInput={handleChangeNickname}
            />
          </div>
        </div>
      ) : (
        <div>
          <img
            className="w-[120px] h-[120px] rounded-md object-cover mt-10 mb-2.5"
            src={user.profileImage}
            alt={`${user.nickname}의 프로필 이미지`}
          />
          <p className="font-medium text-lg text-center m-auto">{user.nickname}</p>
        </div>
      )}

      <div
        className={`w-full flex flex-col justify-center items-start rounded-[5px] p-5 ${isEdit ? "bg-light-gray" : "bg-light-yellow"}`}
      >
        <div>
          <span className="font-medium text-base text-center">이메일: </span>
          <span className="font-regular text-base text-center">{user.email}</span>
        </div>
        <div className={`h-[1px] w-full my-1  ${isEdit ? "bg-gray" : "bg-yellow"}`}></div>
        <div>
          <span className="font-medium text-base text-center">연결된 소셜 계정: </span>
          <span className="font-regular text-base text-center">{user.oauthServerType}</span>
        </div>
      </div>

      <div
        className={`w-full flex flex-col justify-center items-start rounded-[5px] p-5 ${isEdit ? "bg-light-gray" : "bg-light-yellow"}`}
      >
        <div>
          <span className="font-medium text-base text-center">성별: </span>
          <span>{user.gender === "MAN" ? "남성" : "여성"}</span>
        </div>
        <div className={`h-[1px] w-full my-1  ${isEdit ? "bg-gray" : "bg-yellow"}`}></div>
        <div>
          <span className="font-medium text-base text-center">생일: </span>
          <span className="font-regular text-base text-center">{user.birthday}</span>
        </div>
      </div>

      <TagItemList
        layoutType={isEdit ? "mypageSelect" : "mySelect"}
        tags={new Set(user.classification)}
        setTags={handleChangeClassification}
      />
      <div></div>

      <Button label={isEdit ? "저장하기" : "프로필 편집"} handleClickButton={handleClickButton} />

      {!isEdit && (
        <AccountManagement
          handleClickLogout={handleClickLogout}
          handleClickDeleteMember={handleClickDeleteMember}
        />
      )}
    </div>
  );
};

export default MyPage;
