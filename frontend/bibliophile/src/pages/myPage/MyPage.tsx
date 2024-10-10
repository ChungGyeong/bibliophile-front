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
import { useCheckNickName } from "@/hooks/useCheckNickName.tsx";
import { InputField } from "@/components/common/InputFiled.tsx";

const MyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);

  const [uploading, setUploading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState<UsersResponse>({
    userId: user?.userId,
    email: user?.email,
    nickname: user?.nickname,
    gender: user?.gender,
    birthday: user?.birthday,
    classification: user?.classification,
    profileImage: user?.profileImage,
    oauthServerType: user?.oauthServerType,
  });
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [isOpenDeleteMemberModal, setIsOpenDeleteMemberModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const { validationText, validationNickname } = useCheckNickName();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
        setModalMessage(`${file.name}은(는) 파일 크기가 5MB를 초과하였습니다.`);
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

  const handleClickButton = async () => {
    setIsEdit(!isEdit);

    if (!isEdit) return;

    setUploading(true);

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
    ).then(response => {
      dispatch(loadUser());
      if (response.meta.requestStatus === "rejected") {
        setInputs({
          ...inputs,
          nickname: user.nickname,
          classification: user.classification,
          profileImage: user.profileImage,
        });
      } else {
        navigate("/mypage");
      }
    });
    setUploading(false);
  };

  const handleClickLogout = () => {
    dispatch(logout()).then(response => {
      if (response.meta.requestStatus === "fulfilled") {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      } else alert("로그아웃에 실패했습니다. 다시 시도해주세요!");
    });
  };

  const handleClickDeleteMember = async () => {
    const response = await dispatch(removeUser());
    navigate("/login", { replace: true });
    if (response.meta.requestStatus === "rejected") {
      navigate("/mypage", { replace: true });
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요!");
    }
  };

  useEffect(() => {
    validationNickname(inputs.nickname);
  }, [inputs.nickname, validationNickname]);

  useEffect(() => {
    dispatch(loadUser()).then(response => {
      if (response.meta.requestStatus === "fulfilled") {
        setInputs({
          ...inputs,
          userId: user.userId,
          email: user.email,
          nickname: user.nickname,
          gender: user.gender,
          birthday: user.birthday,
          classification: user.classification,
          profileImage: user.profileImage,
          oauthServerType: user.oauthServerType,
        });
      } else {
        navigate("/login");
      }
    });
  }, [isEdit, setIsEdit]);

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
        <div className="w-full">
          <ProfileImageUploader
            handleClickProfileImage={handleClickProfileImage}
            profileImage={uploadImage ? URL.createObjectURL(uploadImage) : inputs.profileImage}
            fileInputRef={fileInputRef}
            handleChangeImageFiles={handleChangeImageFiles}
          />
          <div className="h-7"></div>
          <InputField
            label="닉네임 수정"
            component={
              <InputBox
                value={inputs.nickname}
                handleChangeInput={e => {
                  setInputs((prev: UsersResponse) => ({ ...prev, nickname: e.target.value }));
                }}
                placeholder="닉네임을 입력해주세요"
                noticeMessage={validationText}
              />
            }
          />
        </div>
      ) : (
        <div>
          <img
            className="w-[120px] h-[120px] rounded-md object-cover mt-10 mb-2.5 border-common"
            src={
              user?.profileImage
                ? user.profileImage
                : "https://closetoyoubucket.s3.ap-northeast-2.amazonaws.com/42c9bd10-933d-4274-8575-883fd2fa0cec.jpg"
            }
            alt="프로필 이미지"
          />
          <p className="font-medium text-lg text-center ">{user?.nickname}</p>
        </div>
      )}

      <UserInfoField
        isEdit={isEdit}
        firstTitle="이메일: "
        firstContent={user?.email}
        secondTitle="연결된 소셜 계정: "
        secondContent={user?.oauthServerType}
      />

      <UserInfoField
        isEdit={isEdit}
        firstTitle="성별: "
        firstContent={user?.gender === "MAN" ? "남성" : "여성"}
        secondTitle="생일: "
        secondContent={user?.birthday}
      />

      <TagItemList
        layoutType={isEdit ? "mypageSelect" : "mySelect"}
        tags={isEdit ? inputs.classification : user ? user.classification : []}
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

      {uploading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
          <img src="/images/loading.gif" alt="로딩 중..." className="m-auto" />
        </div>
      )}
    </div>
  );
};

export default MyPage;
