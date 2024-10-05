import React, { useEffect, useRef, useState } from "react";
import { UsersResponse } from "@/types/user.ts";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import InputBox from "@/components/common/InputBox.tsx";
import Button from "@/components/common/Button.tsx";
import Modal from "@/components/common/Modal.tsx";
import AccountManagement from "@/pages/myPage/AccountManagement.tsx";
import ProfileImageUploader from "@/pages/myPage/ProfileImageUploader.tsx";
import UserInfoField from "@/pages/myPage/UserInfoField.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadUser } from "@/redux/userSlice.ts";

const MyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);

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

  const handleClickButton = () => {
    setIsEdit(!isEdit);
  };

  const handleClickLogout = () => {
    setIsOpenLogoutModal(!isOpenLogoutModal);
  };

  const handleClickDeleteMember = () => {
    setIsOpenDeleteMemberModal(!isOpenDeleteMemberModal);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading) return <img src="/images/loading.gif" alt="로딩 중..." />;

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
          <ProfileImageUploader
            handleClickProfileImage={handleClickProfileImage}
            profileImage={inputs.profileImage}
            nickname={user.nickname}
            fileInputRef={fileInputRef}
            handleChangeImageFiles={handleChangeImageFiles}
          />
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
            className="w-[120px] h-[120px] rounded-md object-cover mt-10 mb-2.5 border-common"
            src={user.profileImage ? user.profileImage : "/images/no-image.svg"}
            alt={`${user.nickname}의 프로필 이미지`}
          />
          <p className="font-medium text-lg text-center m-auto">{user.nickname}</p>
        </div>
      )}

      <UserInfoField
        isEdit={isEdit}
        firstTitle="이메일: "
        firstContent={user.email}
        secondTitle="연결된 소셜 계정: "
        secondContent={user.oauthServerType}
      />

      <UserInfoField
        isEdit={isEdit}
        firstTitle="성별: "
        firstContent={user.gender === "MAN" ? "남성" : "여성"}
        secondTitle="생일: "
        secondContent={user.birthday}
      />

      <TagItemList
        layoutType={isEdit ? "mypageSelect" : "mySelect"}
        tags={inputs.classification.length === 0 ? user.classification : inputs.classification}
        setTags={newTags => setInputs({ ...inputs, classification: newTags })}
      />

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
