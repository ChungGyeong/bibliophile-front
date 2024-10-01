import { NicknameResponse, UsersRequest, UsersResponse } from "@/types/user.ts";
import { AxiosError } from "axios";
import { clientInstance } from "@/libs/http-clients.ts";

export const createCheckNickname = async (nickName: string) => {
  try {
    return await clientInstance.post<NicknameResponse>("/users/check-nickname", {
      nickname: nickName,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "닉네임 확인 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const createUser = async (user: UsersRequest) => {
  try {
    return await clientInstance.post<UsersResponse>("/users/signup", user);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "닉네임 확인 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
