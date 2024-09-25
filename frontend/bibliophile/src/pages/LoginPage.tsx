import React from "react";
import SocialLoginButton from "@/components/common/SocialLoginButton.tsx";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center mb-14">
        <img src="/images/logo.png" alt="로고이미지" className="w-28 h-28" />
        <p className="text-2xl font-regular mt-2">책 먹는 여우</p>
      </div>
      <SocialLoginButton />
      <p className="font-light text-sm text-medium-gray text-center mt-3">
        아이디, 비밀번호를 입력할 필요 없이
        <br />
        SNS 아이디로 쉽고 빠르게 회원가입 하세요!
      </p>
    </div>
  );
};

export default LoginPage;
