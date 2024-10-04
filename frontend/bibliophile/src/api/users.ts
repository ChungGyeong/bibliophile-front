import {NicknameResponse, SignupRequest, UsersResponse} from "@/types/user.ts";
import { clientInstance } from "@/libs/http-clients.ts";

export const createCheckNickname = async (nickname: string) => {
  return await clientInstance
    .post<ApiResponseType<NicknameResponse>>("/users/check-nickname", {
      nickname: nickname,
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const createUser = async (user: SignupRequest) => {
  return await clientInstance
    .post<ApiResponseType<UsersResponse>>("/users/signup", user)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
