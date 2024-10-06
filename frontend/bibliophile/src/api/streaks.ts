import { AxiosError } from "axios";
import { clientInstance } from "@/libs/http-clients.ts";

export const getStreaks = async (year: number, month: number) => {
  try {
    return await clientInstance.get(`/streaks`, {
      params: {
        year,
        month,
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "스트릭을 불러오던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}