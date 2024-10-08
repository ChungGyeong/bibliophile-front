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
import { editUser, loadUser, logout, removeUser } from "@/redux/userSlice.ts";
import { translateTagToEnglish } from "@/utils/translator.ts";
import { useNavigate } from "react-router-dom";
import { addImage } from "@/redux/imageSlice";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const handleClickProfileImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeImageFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setModalMessage(
          `${file.name}은(는) 지원하지 않는 형식입니다. JPG, JPEG, PNG 형식만 업로드 가능합니다.`
        );
        setIsModalOpen(true);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setModalMessage(`${file.name}은(는) 파일 크기가 2MB를 초과하였습니다.`);
        setIsModalOpen(true);
        return;
      }

      const isValidImage = await checkFileType(file);
      if (!isValidImage) {
        setModalMessage(`${file.name}은(는) 잘못된 파일입니다. 파일 형식을 확인해주세요.`);
        setIsModalOpen(true);
        return;
      }

      setUploadImage(file);
    }
  };

  const checkFileType = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = function () {
        const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
        let header = "";
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }

        let fileType;
        switch (header) {
          case "89504e47":
            fileType = "image/png";
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            fileType = "image/jpeg";
            break;
          default:
            fileType = "";
            break;
        }

        resolve(ALLOWED_FILE_TYPES.includes(fileType));
      };

      reader.onerror = function () {
        reject(false);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: UsersResponse) => ({ ...prev, nickname: e.target.value }));
  };

  const handleClickButton = async () => {
    setIsEdit(!isEdit);

    if (!isEdit) return;

    let newProfileImage = inputs.profileImage;
    let result = null;

    if (uploadImage) {
      const formData = new FormData();
      formData.append("files", uploadImage);
      result = await dispatch(addImage(formData));
    }
    if (result && result.payload && Array.isArray(result.payload) && result.payload.length > 0) {
      newProfileImage = result.payload[0].url;
    }
    dispatch(
      editUser({
        nickname: inputs.nickname,
        classification: inputs.classification.map(classification => {
          return translateTagToEnglish(classification);
        }),
        profileImage: newProfileImage,
      })
    ).then(() => {
      dispatch(loadUser());
    });
  };

  const handleClickLogout = () => {
    dispatch(logout);
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleClickDeleteMember = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading)
    return (
      <div className="w-full">
        <img src="/images/loading.gif" alt="로딩 중..." className="m-auto mt-[50%]" />
      </div>
    );

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${isEdit ? "gap-4" : "gap-4"}`}
    >
      {isOpenLogoutModal && (
        <Modal
          title="정말 로그아웃 하시겠어요?"
          isOpen={isOpenLogoutModal}
          handleClickClose={() => {
            setIsOpenLogoutModal(!isOpenLogoutModal);
          }}
          handleClickConfirm={handleClickLogout}
        />
      )}
      {isOpenDeleteMemberModal && (
        <Modal
          title="정말 탈퇴 하시겠어요?"
          isOpen={isOpenDeleteMemberModal}
          handleClickClose={() => {
            setIsOpenDeleteMemberModal(!isOpenDeleteMemberModal);
          }}
          handleClickConfirm={() => {
            handleClickDeleteMember();
          }}
        />
      )}
      {isEdit ? (
        <div>
          <ProfileImageUploader
            handleClickProfileImage={handleClickProfileImage}
            profileImage={uploadImage ? URL.createObjectURL(uploadImage) : inputs.profileImage}
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
          handleClickLogout={() => {
            setIsOpenLogoutModal(!isOpenLogoutModal);
          }}
          handleClickDeleteMember={() => {
            setIsOpenDeleteMemberModal(!isOpenDeleteMemberModal);
          }}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        handleClickClose={() => setIsModalOpen(false)}
        title={modalMessage}
        handleClickConfirm={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MyPage;
