import React, { ChangeEventHandler, LegacyRef } from "react";

interface ProfileImageUploaderProps {
  handleClickProfileImage: () => void;
  profileImage: string;
  nickname: string;
  fileInputRef: LegacyRef<HTMLInputElement> | undefined;
  handleChangeImageFiles: ChangeEventHandler<HTMLInputElement>;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  handleClickProfileImage,
  profileImage,
  nickname,
  fileInputRef,
  handleChangeImageFiles,
}) => {
  return (
    <div>
      <img
        className="w-[120px] h-[120px] rounded-md object-cover mt-10 mb-2.5 border-common"
        onClick={handleClickProfileImage}
        src={profileImage ? profileImage : '/images/upload-image.svg'}
        alt={`${nickname}의 프로필 이미지`}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChangeImageFiles}
      />
    </div>
  );
};

export default ProfileImageUploader;
