import { AxiosError } from "axios";
import { clientInstance } from "@/libs/http-clients.ts";
import { UpdateReportData, CreateData } from "@/types/report";

export const getReport = async (bookReportId: number) => {
  try {
    return await clientInstance.get(`/book-reports/${bookReportId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "독후감을 불러오던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const updateReport = async (bookReportId: number, updateData: UpdateReportData) => {
  try {
    return await clientInstance.patch(`/book-reports/${bookReportId}`, updateData);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "독후감을 수정하던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const deleteReport = async (bookReportId: number) => {
  try {
    return await clientInstance.delete(`/book-reports/${bookReportId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "독후감 삭제를 하던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const createReport = async(createData: CreateData) => {
  try{
    return await clientInstance.post(`/book-reports`, createData);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "독후감 생성 하던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const getMyReport = async (myBookId: number) => {
  try {
    return await clientInstance.get(`/book-reports/mine/${myBookId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "내가 작성한 독후감을 불러오던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}