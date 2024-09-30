import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/userSlice.ts";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      dispatch(login({ oauthServerType: "KAKAO", code }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/signup");
    }
  }, [isLoggedIn, navigate]);

  return (
    !isLoggedIn && (
      <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
        <p>로딩 중..</p>
      </div>
    )
  );
};

export default KakaoLogin;
