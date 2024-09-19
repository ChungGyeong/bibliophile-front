import React from "react";

import kakao from "../../assets/login/kakao.png";
import google from "../../assets/login/google.png";
import naver from "../../assets/login/naver.png";

const SocialLoginButton: React.FC = () => {
  const handleClickSocialLogin = (oauthServerType: string) => {
    alert(oauthServerType);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-[30px]">
        <button
          onClick={() => handleClickSocialLogin("kakao")}
          className="flex w-[60px] h-[60px] justify-center items-center flex-shrink-0 rounded-full"
        >
          <img src={kakao} alt="카카오 로그인" className="w-[60px] h-[60px] rounded-full" />
        </button>
        <button
          onClick={() => handleClickSocialLogin("google")}
          className="flex w-[60px] h-[60px] justify-center items-center flex-shrink-0 rounded-full"
        >
          <img src={google} alt="구글 로그인" className="w-[60px] h-[60px] rounded-full" />
        </button>
        <button
          onClick={() => handleClickSocialLogin("naver")}
          className="flex w-[60px] h-[60px] justify-center items-center flex-shrink-0 rounded-full"
        >
          <img src={naver} alt="네이버 로그인" className="w-[60px] h-[60px] rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButton;
