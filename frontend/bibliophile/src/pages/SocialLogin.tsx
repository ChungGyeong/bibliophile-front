import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/userSlice.ts";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { useNavigate, useParams } from "react-router-dom";

const SocialLogin = () => {
  const { isLoggedIn, isFirst } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const { provider } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      dispatch(login({ oauthServerType: provider!.toUpperCase(), code }));
    }
  }, [dispatch, provider]);

  useEffect(() => {
    if (isLoggedIn && isFirst) {
      navigate("/signup");
    } else if (isLoggedIn && !isFirst) {
      navigate("/");
    }
  }, [isLoggedIn, isFirst, navigate]);

  return (
    !isLoggedIn && (
      <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
        <img src="/images/loading.gif" alt="loading" />
      </div>
    )
  );
};

export default SocialLogin;
