import { clientInstance } from "../libs/http-clients.ts";
import { NicknameResponse } from "@/types/user.ts";
import { AxiosError } from "axios";

export const createCheckNickname = async (nickName: string) => {
  try {
    return await clientInstance.post<NicknameResponse>("/api/users/check-nickname", {
      nickname: nickName,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "닉네임 확인 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
