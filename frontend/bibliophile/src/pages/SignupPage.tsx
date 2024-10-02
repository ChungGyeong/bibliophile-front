import React, { useState, useEffect, useCallback, useMemo } from "react";
import Button from "@/components/common/Button.tsx";
import InputBox from "@/components/common/InputBox.tsx";
import SelectBox from "@/components/common/SelectBox.tsx";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import { ClassificationType, UsersRequest } from "@/types/user.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { checkNicknameDuplication, signup } from "@/redux/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { isBefore, isValid, parse } from "date-fns";
import { GENDER_OPTIONS, TAGS } from "@/constants/constants.ts";

const SignupPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, isNicknameExist } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<UsersRequest>({
    nickname: "",
    gender: "MAN",
    birthday: "",
    classification: [],
    profileImage: "",
    email: user.email,
    oauthServerType: user.oauthServerType,
  });

  const [validationString, setValidationString] = useState("");

  useEffect(() => {
    if (user) {
      setInputs(prev => ({
        ...prev,
        email: user.email,
        oauthServerType: user.oauthServerType,
      }));
    }
  }, [user]);

  const handleChangeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setInputs(prev => ({ ...prev, nickname: newNickname }));
  }, []);

  const handleChangeGender = useCallback((value: string) => {
    setInputs(prev => ({
      ...prev,
      gender: value === "남성" ? "MAN" : "WOMAN",
    }));
  }, []);

  const handleChangeBirthday = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, "");
    const year = inputValue.slice(0, 4);
    const month = inputValue.slice(4, 6);
    const day = inputValue.slice(6, 8);

    inputValue = [year, month, day].filter(Boolean).join(".");

    setInputs(prev => ({
      ...prev,
      birthday: inputValue,
    }));
    const parsedDate = parse(inputValue, "yyyy.MM.dd", new Date());

    const minDate = new Date(1900, 0, 1);
    const today = new Date();

    if (isValid(parsedDate) && (isBefore(parsedDate, minDate) || isBefore(today, parsedDate))) {
      alert("생년월일을 1900.01.01 이상, 오늘 날짜 이하로 입력해주세요.");
      setInputs(prev => ({
        ...prev,
        birthday: "",
      }));
    }
  }, []);

  const handleChangeClassification = useCallback((selectedTags: Set<string>) => {
    const validClassifications = Array.from(selectedTags).filter(tag =>
      TAGS.includes(tag as ClassificationType)
    ) as ClassificationType[];

    setInputs(prev => ({
      ...prev,
      classification: validClassifications,
    }));
  }, []);

  const handleClickSignup = useCallback(() => {
    if (!user.email) {
      alert("로그인부터 해주세요!");
      return;
    }
    const userData = {
      ...inputs,
      email: user.email,
      oauthServerType: user.oauthServerType,
    };

    dispatch(signup(userData));

    if (!loading) navigate("/");
  }, [inputs, user, dispatch, loading, navigate]);

  const validationNickname = useCallback(
    (nickname: string) => {
      if (nickname.length < 2 || nickname.length > 7) {
        setValidationString("length");
      } else if (isNicknameExist) {
        setValidationString("exist");
      } else {
        setValidationString("");
      }
    },
    [isNicknameExist]
  );

  const debouncedCheckNickname = useMemo(
    () =>
      debounce((nickname: string) => {
        if (nickname.length >= 2 && nickname.length <= 7) {
          dispatch(checkNicknameDuplication(nickname));
        }
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    validationNickname(inputs.nickname);
    debouncedCheckNickname(inputs.nickname);
  }, [inputs.nickname, validationNickname, debouncedCheckNickname]);

  const isFormValid = useMemo(
    () => inputs.nickname && inputs.gender && inputs.birthday,
    [inputs.nickname, inputs.gender, inputs.birthday]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <p className="mb-8 font-bold text-xl">회원정보</p>
      <InputField
        label="닉네임"
        component={
          <InputBox
            value={inputs.nickname}
            handleChangeInput={handleChangeNickname}
            placeholder="닉네임을 입력해주세요"
            noticeMessage={
              validationString === "length"
                ? "최소 2자에서 최대 7자로 입력해주세요."
                : validationString === "exist"
                  ? "이미 사용 중인 닉네임 입니다."
                  : "사용 가능한 닉네입 입니다!"
            }
          />
        }
      />
      <InputField
        label="성별"
        component={
          <SelectBox
            options={GENDER_OPTIONS}
            defaultOption={inputs.gender === "MAN" ? "남성" : "여성"}
            onSelect={handleChangeGender}
          />
        }
      />
      <InputField
        label="생년월일"
        component={
          <InputBox
            value={inputs.birthday}
            handleChangeInput={handleChangeBirthday}
            placeholder="yyyy.mm.dd 형식으로 입력해주세요."
          />
        }
      />
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
      <Button label="회원가입" disabled={!isFormValid} handleClickButton={handleClickSignup} />
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  component?: React.ReactNode;
}> = ({ label, component }) => (
  <div className="flex w-full justify-between items-center">
    <p className="w-1/3 font-medium text-base">{label}</p>
    {component}
  </div>
);

export default SignupPage;
