import React, { ChangeEventHandler, LegacyRef } from "react";

interface ProfileImageUploaderProps {
  handleClickProfileImage: () => void;
  profileImage: string;
  fileInputRef: LegacyRef<HTMLInputElement> | undefined;
  handleChangeImageFiles: ChangeEventHandler<HTMLInputElement>;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  handleClickProfileImage,
  profileImage,
  fileInputRef,
  handleChangeImageFiles,
}) => {
  return (
    <div className="w-[120px] h-[120px] m-auto">
      <img
        className="w-full h-full rounded-md object-cover mt-10 mb-5 border-common"
        onClick={handleClickProfileImage}
        src={profileImage ? profileImage : "/images/upload-image.svg"}
        alt={"프로필 이미지"}
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
