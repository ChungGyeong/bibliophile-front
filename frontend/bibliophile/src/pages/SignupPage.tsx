import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button.tsx";
import InputBox from "@/components/common/InputBox.tsx";
import SelectBox from "@/components/common/SelectBox.tsx";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import { ClassificationType, UsersRequest } from "@/types/user.ts";
import DatePicker from "@/components/common/DatePicker.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { signup } from "@/redux/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { formatDateToString } from "@/utils/calDate.ts";

const SignupPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);

  const [inputs, setInputs] = useState<UsersRequest>({
    nickname: "",
    gender: "MAN",
    birthday: "",
    classification: [],
    profileImage: "",
    email: user.email,
    oauthServerType: user.oauthServerType,
  });

  useEffect(() => {
    if (user) {
      setInputs(prev => ({
        ...prev,
        email: user.email,
        oauthServerType: user.oauthServerType,
      }));
    }
  }, [user]);

  const [isValid, setIsValid] = useState({
    nicknameLength: false,
    nicknameExist: false,
  });

  const navigate = useNavigate();

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setInputs(prev => ({ ...prev, nickname: newNickname }));

    const validationResult = validationNickname(newNickname);

    setIsValid(() => ({
      nicknameLength: validationResult === "length",
      nicknameExist: validationResult === "exist",
    }));
  };

  const handleChangeGender = (value: string) => {
    setInputs(prev => ({
      ...prev,
      gender: value === "남성" ? "MAN" : "WOMAN",
    }));
  };

  const handleChangeBirthday = (date: Date | undefined) => {
    setInputs(prev => ({
      ...prev,
      birthday: date ? formatDateToString(date) : "",
      // TODO: 날짜 텍스트로 입력 가능하도록 수정, 캘린더 UI 수정
      // birthday: "1998-12-28",
    }));
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

    setInputs(prev => ({
      ...prev,
      classification: validClassifications,
    }));
  };

  const handleClickSignup = () => {
    const userData = {
      ...inputs,
      email: user.email,
      oauthServerType: user.oauthServerType,
    };

    dispatch(signup(userData));

    if (loading) return <img src="/images/loading.gif" alt="로딩중..." />;
    else navigate("/");
  };

  const validationNickname = (nickname: string) => {
    if (nickname.length < 2 || nickname.length > 7) {
      return "length";
    }

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
          value={inputs.nickname}
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
          defaultOption={inputs.gender === "MAN" ? "남성" : "여성"}
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
          tags={new Set(inputs.classification)}
          setTags={handleChangeClassification}
        />
      </div>
      <Button
        label="회원가입"
        disabled={!(inputs.nickname && inputs.gender && inputs.birthday)}
        handleClickButton={handleClickSignup}
      />
    </div>
  );
};

export default SignupPage;
