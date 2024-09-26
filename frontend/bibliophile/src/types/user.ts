export interface UserType {
  loading: boolean;
  error: string | null;
  isNicknameExist: boolean;
  data: UsersResponse;
}

export interface UsersResponse {
  userId: number;
  email: string;
  nickname: string;
  gender: string;
  birthday: string;
  classification: [];
  profileImage: string;
  oauthServerType: "KAKAO" | "GOOGLE" | "NAVER";
}

export interface NicknameResponse {
  exist: boolean;
}
