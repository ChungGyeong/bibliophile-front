import { UpdateMemoData, CreateData } from "@/types/memo";
import { AxiosError } from "axios";
import { clientInstance } from "@/libs/http-clients.ts";

export const getMemo = async (memoId: number) => {
  try {
    return await clientInstance.get(`/memos/${memoId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "메모를 불러오던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const updateMemo = async (memoId: number, updateData: UpdateMemoData) => {
  try {
    return await clientInstance.patch(`/memos/${memoId}`, updateData);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "메모를 수정하던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const deleteMemo = async (memoId: number) => {
  try {
    return await clientInstance.delete(`/memos/${memoId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "메모 삭제를 하던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const createMemo = async(createData: CreateData) => {
  try{
    return await clientInstance.post(`/memos`, createData);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "메모를 생성 하던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export const getMyMemoList = async (memoId: number) => {
  try {
    return await clientInstance.get(`/memos/mine/${memoId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "내가 작성한 메모를 불러오던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}