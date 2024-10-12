export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timeStamp: string;
}

export interface MyBookStatisticStateType {
  loading: boolean;
  error: string | null;
  statisticList: MyBookStatisticsResponse[];
}

export interface MyBookStatisticsResponse {
  kdc: string;
  count: number;
}
