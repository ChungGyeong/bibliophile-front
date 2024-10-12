import { clientInstance } from "../libs/http-clients.ts";
import { MyBookStatisticsResponse, ApiResponse } from "@/types/myBookStatistics.ts";
import { AxiosError } from "axios";

// 나의 책 분야별 통계 조회
export const getMyBookStatistics = async () => {
  try {
    return await clientInstance.get<ApiResponse<MyBookStatisticsResponse[]>>("/my-book/statistics");
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message || "나의 책 분야별 통계 조회 중 오류가 발생했습니다."
      );
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
