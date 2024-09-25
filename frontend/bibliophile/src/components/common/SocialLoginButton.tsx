import React from "react";

const SocialLoginButton: React.FC = () => {
  const handleClickKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  };

  const handleClickGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  const handleClickNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URI}&state=Bibliophile`;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-4">
        <button
          onClick={handleClickKakaoLogin}
          className="flex w-[60px] h-[60px] justify-center items-center flex-shrink-0 rounded-full"
        >
          <img
            src="/images/login/kakao.png"
            alt="카카오 로그인"
            className="w-[60px] h-[60px] rounded-full"
          />
        </button>
        <button
          onClick={handleClickGoogleLogin}
          className="flex w-[60px] h-[60px] justify-center items-center flex-shrink-0 rounded-full"
        >
          <img
            src="/images/login/google.png"
            alt="구글 로그인"
            className="w-[60px] h-[60px] rounded-full"
          />
        </button>
        <button
          onClick={handleClickNaverLogin}
          className="flex w-[60px] h-[60px] justify-center items-center flex-shrink-0 rounded-full"
        >
          <img
            src="/images/login/naver.png"
            alt="네이버 로그인"
            className="w-[60px] h-[60px] rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButton;
