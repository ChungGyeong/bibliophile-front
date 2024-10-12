import { clientInstance } from "@/libs/http-clients.ts";
import { AxiosError } from "axios";

export const getRefreshToken = () => {
  return clientInstance.post("/oauth/refresh");
};

export const socialLogin = (oauthServerType: string, code: string) => {
  try {
    return clientInstance.get(`/oauth/login/${oauthServerType}`, {
      params: { code: code },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "소셜 로그인 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
