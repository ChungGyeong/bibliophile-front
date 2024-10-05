import { AxiosError } from "axios";
import { clientInstance } from "@/libs/http-clients.ts";
import { CreateData } from "@/types/review";

export const getMyReview = async (myBookId: number) => {
  try {
    return await clientInstance.get(`/reviews/mine/${myBookId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "내 리뷰를 불러오던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const createReview = async(createData: CreateData) => {
  try{
    return await clientInstance.post(`/reviews`, createData);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "리뷰를 작성 하던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const deleteReview = async (reviewId: number) => {
  try {
    return await clientInstance.delete(`/reviews/${reviewId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "리뷰 삭제를 하던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
