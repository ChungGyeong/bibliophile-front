import { clientInstance } from "@/libs/http-clients.ts";

export const getRefreshToken = () => {
  return clientInstance.post("/api/oauth/refresh");
};

export const socialLogin = (oauthServerType: string, code: string) => {
  return clientInstance.get(`/oauth/login/${oauthServerType}`, {
    params: { code: code },
  });
};
