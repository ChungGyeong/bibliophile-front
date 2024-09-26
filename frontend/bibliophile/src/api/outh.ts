import { clientInstance } from "@/libs/http-clients.ts";

export const getRefreshToken = () => {
  return clientInstance.post("/api/oauth/refresh");
};
