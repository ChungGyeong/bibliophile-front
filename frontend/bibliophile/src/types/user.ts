export interface UserType {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  isNicknameExist: boolean;
  isFirst: boolean;
  user: UsersResponse;
}

export interface UsersRequest {
  nickname: string;
  email: string;
  gender: "MAN" | "WOMAN";
  birthday: string;
  classification: ClassificationType[];
  profileImage: string;
  oauthServerType: "KAKAO" | "GOOGLE" | "NAVER";
}

export interface UsersResponse {
  userId: number;
  email: string;
  nickname: string;
  gender: "MAN" | "WOMAN";
  birthday: string;
  classification: ClassificationType[];
  profileImage: string;
  oauthServerType: "KAKAO" | "GOOGLE" | "NAVER";
}

export interface NicknameResponse {
  exist: boolean;
}

export type ClassificationType =
  | "GENERAL_WORKS"
  | "PHILOSOPHY"
  | "RELIGION"
  | "SOCIAL_SCIENCES"
  | "NATURAL_SCIENCES"
  | "TECHNOLOGY"
  | "ARTS"
  | "LANGUAGE"
  | "LITERATURE"
  | "HISTORY";
