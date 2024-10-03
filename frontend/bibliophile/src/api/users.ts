import { NicknameResponse, UsersRequest, UsersResponse } from "@/types/user.ts";
import { clientInstance } from "@/libs/http-clients.ts";

export const createCheckNickname = async (nickname: string) => {
  return await clientInstance
    .post<NicknameResponse>("/users/check-nickname", {
      nickname: nickname,
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const createUser = async (user: UsersRequest) => {
  return await clientInstance
    .post<UsersResponse>("/users/signup", user)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
