import React, { useState, useEffect, useCallback, useMemo } from "react";
import Button from "@/components/common/Button";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import { SignupRequest } from "@/types/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signup } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { isBefore, isValid, parse } from "date-fns";
import { GENDER_OPTIONS } from "@/constants/constants";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import { translateTagToEnglish } from "@/utils/translator.ts";
import { useCheckNickName } from "@/hooks/useCheckNickName.tsx";
import { InputField } from "@/components/common/InputFiled.tsx";

const SignupPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, error, loading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<SignupRequest>({
    nickname: "",
    gender: "MAN",
    birthday: "",
    classification: [],
    profileImage:
      "https://closetoyoubucket.s3.ap-northeast-2.amazonaws.com/42c9bd10-933d-4274-8575-883fd2fa0cec.jpg",
    email: user.email,
    oauthServerType: user.oauthServerType,
  });

  const { validationText, validationNickname, debouncedCheckNickname } = useCheckNickName();

  const isFormValid = useMemo(
    () => inputs.nickname && inputs.gender && inputs.birthday,
    [inputs.nickname, inputs.gender, inputs.birthday]
  );

  const handleChangeInput = useCallback((name: keyof SignupRequest, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleChangeGender = useCallback(
    (value: string) => {
      handleChangeInput("gender", value === "남성" ? "MAN" : "WOMAN");
    },
    [handleChangeInput]
  );

  const handleChangeBirthday = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value.replace(/\D/g, "");
      const year = inputValue.slice(0, 4);
      const month = inputValue.slice(4, 6);
      const day = inputValue.slice(6, 8);

      inputValue = [year, month, day].filter(Boolean).join("-");

      handleChangeInput("birthday", inputValue);
    },
    [handleChangeInput]
  );

  const handleClickSignup = useCallback(() => {
    if (!user.email) {
      alert("로그인부터 해주세요!");
      navigate("/login");
      return;
    }

    const parsedDate = parse(inputs.birthday, "yyyy-MM-dd", new Date());
    const minDate = new Date(1900, 0, 1);
    const today = new Date();

    if (!isValid(parsedDate)) {
      alert("생년월일을 올바른 형식(yyyyMMdd)으로 입력해주세요.");
      setInputs(prev => ({ ...prev, birthday: "" }));
      return;
    }

    if (isValid(parsedDate) && (isBefore(parsedDate, minDate) || isBefore(today, parsedDate))) {
      alert("생년월일을 1900.01.01 이상, 오늘 날짜 이하로 입력해주세요.");
      setInputs(prev => ({ ...prev, birthday: "" }));
      return;
    }

    const signupData = {
      ...inputs,
      classification: inputs.classification.map(translateTagToEnglish),
    };

    dispatch(signup(signupData)).then(response => {
      if (response.meta.requestStatus === "fulfilled") {
        alert("회원가입 성공!");
        localStorage.setItem("isAuthenticated", "yes");
        navigate("/");
      } else {
        alert("회원가입에 실패했습니다. ㅠㅠ");
        setInputs(prev => ({
          ...prev,
          nickname: "",
          gender: "MAN",
          birthday: "",
          classification: [],
          profileImage:
            "https://closetoyoubucket.s3.ap-northeast-2.amazonaws.com/42c9bd10-933d-4274-8575-883fd2fa0cec.jpg",
        }));
      }
    });
  }, [inputs, user, dispatch, navigate, error, loading]);

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
            handleChangeInput={e => handleChangeInput("nickname", e.target.value)}
            placeholder="닉네임을 입력해주세요"
            noticeMessage={validationText}
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

export default SignupPage;
