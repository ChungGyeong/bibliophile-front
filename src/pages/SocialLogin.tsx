import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/userSlice.ts";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { useNavigate, useParams } from "react-router-dom";

const SocialLogin = () => {
  const { isLoggedIn, error } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const { provider } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      dispatch(login({ oauthServerType: provider!.toUpperCase(), code })).then(response => {
        if (response.meta.requestStatus === "fulfilled" && !response.payload.data.isFirst) {
          localStorage.setItem("isAuthenticated", "yes");
          navigate("/");
        } else if (response.meta.requestStatus === "fulfilled" && response.payload.data.isFirst) {
          navigate("/signup");
        } else if (response.meta.requestStatus === "rejected") {
          alert("로그인에 실패했습니다." + typeof error !== "undefined" && error);
        }
      });
    }
  }, [dispatch, provider]);

  return (
    !isLoggedIn && (
      <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
        <img src="/images/loading.gif" alt="loading" />
      </div>
    )
  );
};

export default SocialLogin;
