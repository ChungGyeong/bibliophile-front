export interface userType {
  userId: number;
  email: string;
  nickname: string;
  gender: string;
  birthday: string;
  classification: Set<string>;
  profileImage: string;
  oauthServerType: "KAKAO" | "GOOGLE" | "NAVER";
}
