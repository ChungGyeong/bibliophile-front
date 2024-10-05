import React, { useState, useEffect, useCallback, useMemo } from "react";
import Button from "@/components/common/Button";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import { SignupRequest } from "@/types/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { checkNicknameDuplication, signup } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { isBefore, isValid, parse } from "date-fns";
import { GENDER_OPTIONS } from "@/constants/constants";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import { translateTagToEnglish } from "@/utils/translator.ts";

const SignupPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isNicknameExist, error, loading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<SignupRequest>({
    nickname: "",
    gender: "MAN",
    birthday: "",
    classification: [],
    profileImage: "",
    email: user.email,
    oauthServerType: user.oauthServerType,
  });

  const [validationString, setValidationString] = useState("");

  const isFormValid = useMemo(
    () => inputs.nickname && inputs.gender && inputs.birthday,
    [inputs.nickname, inputs.gender, inputs.birthday]
  );

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

    inputValue = [year, month, day].filter(Boolean).join("-");

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

  const handleClickSignup = useCallback(() => {
    if (!user.email) {
      alert("로그인부터 해주세요!");
      navigate("/login");
      return;
    }

    inputs.classification = inputs.classification.map(classification => {
      return translateTagToEnglish(classification);
    });

    dispatch(signup(inputs));

    if (typeof error !== undefined) {
      alert("회원가입에 실패했습니다. ㅠㅠ");
      setInputs(prev => ({
        ...prev,
        nickname: "",
        gender: "MAN",
        birthday: "",
        classification: [],
        profileImage: "",
        email: user.email,
        oauthServerType: user.oauthServerType,
      }));
    } else if (!loading) {
      alert("회원가입 성공!");
      navigate("/");
    }
  }, [inputs, user, dispatch, navigate]);

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

  useEffect(() => {
    if (user) {
      setInputs(prev => ({
        ...prev,
        email: user.email,
        oauthServerType: user.oauthServerType,
      }));
    }
  }, [user]);

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
            placeholder="YYYYMMDD 형식으로 입력해주세요."
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
          tags={inputs.classification}
          setTags={newTags => setInputs({ ...inputs, classification: newTags })}
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
