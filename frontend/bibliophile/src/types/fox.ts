export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timeStamp: string;
}

export interface FoxStateType {
  loading: boolean;
  error: string | null;
  fox: FoxResponse;
}

export interface FoxResponse {
  foxId: number;
  level: number;
  exp: number;
  feedCount: number;
  percent: number;
  foxType: "BABY" | "YOUTH" | "ADULT";
  foxStatus: "GOOD" | "BAD";
  createdDate: string;
  lastModifyDate: string;
}
