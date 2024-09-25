import React, { useState } from "react";
import Button from "@/components/common/Button.tsx";
import InputBox from "@/components/common/InputBox.tsx";
import SelectBox from "@/components/common/SelectBox.tsx";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import { userType } from "@/types/user.ts";
import DatePicker from "@/components/common/DatePicker.tsx";
import { formatDateToString } from "@/utils/calDate.ts";

const SignupPage: React.FC = () => {
  const [input, setInput] = useState<userType>({
    userId: 0,
    email: "",
    nickname: "",
    gender: "남성",
    birthday: "",
    classification: new Set<string>(),
    profileImage: "",
    oauthServerType: "KAKAO",
  });

  const [isValid, setIsValid] = useState({
    nicknameLength: false,
    nicknameExist: false,
  });

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setInput(prev => ({ ...prev, nickname: newNickname }));

    const validationResult = validationNickname(newNickname);

    setIsValid(() => ({
      nicknameLength: validationResult === "length",
      nicknameExist: validationResult === "exist",
    }));
  };

  const handleChangeGender = (value: string) => {
    setInput(prev => ({ ...prev, gender: value }));
  };

  const handleChangeBirthday = (date: Date | undefined) => {
    setInput(prev => ({ ...prev, birthday: date ? formatDateToString(date) : "" }));
  };

  const handleChangeClassification = (selectedTags: Set<string>) => {
    setInput(prev => ({ ...prev, classification: selectedTags }));
  };

  const handleClickSignup = () => {
    // TODO: 회원가입 API 호출
  };

  const validationNickname = (nickname: string) => {
    if (nickname.length < 2 || nickname.length > 7) {
      return "length";
    }

    //TODO: 닉네임 중복 확인 API 연결
    const existingNicknames = ["박옥순", "김영호", "백현숙"];
    if (existingNicknames.includes(nickname)) {
      return "exist";
    }

    return "pass";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <p className="mb-8 font-bold text-xl">회원정보</p>
      <div className="flex w-full justify-between items-center">
        <p className="w-1/3 font-medium text-base">닉네임</p>
        <InputBox
          value={input.nickname}
          handleChangeInput={handleChangeNickname}
          placeholder="닉네임을 입력해주세요"
          noticeMessage={
            isValid.nicknameLength
              ? "최소 2자에서 최대 7자로 입력해주세요."
              : isValid.nicknameExist
                ? "이미 사용 중인 닉네임입니다."
                : ""
          }
        />
      </div>
      <div className="flex w-full justify-between items-center">
        <p className="w-1/3 font-medium text-base">성별</p>
        <SelectBox
          options={["남성", "여성"]}
          defaultOption={input.gender}
          onSelect={handleChangeGender}
        />
      </div>
      <div className="flex w-full justify-between items-center">
        <p className="w-1/3 font-medium text-base">생년월일</p>
        <DatePicker handleChangeDate={handleChangeBirthday} />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full items-end mb-2.5">
          <p className="font-medium text-base">관심사 선택</p>
          <p className="text-xs text-gray">최대 3개 선택 가능</p>
        </div>
        <TagItemList
          layoutType="signSelect"
          tags={input.classification}
          setTags={handleChangeClassification}
        />
      </div>
      <Button
        label="회원가입"
        disabled={!(input.nickname && input.gender && input.birthday)}
        handleClickButton={handleClickSignup}
      />
    </div>
  );
};

export default SignupPage;
