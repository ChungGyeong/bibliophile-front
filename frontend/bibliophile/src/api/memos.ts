import { UpdateMemoData, CreateData } from "@/types/memo";
import { AxiosError } from "axios";
import { clientInstance } from "@/libs/http-clients.ts";

export const getMemo = async (memoId: number) => {
  return clientInstance.get(`/memos/${memoId}`)
    .then(response => { return response })
    .catch((error: AxiosError) => {
      throw error;
    });
};


export const updateMemo = async (memoId: number, updateData: UpdateMemoData) => {
  return clientInstance.patch(`/memos/${memoId}`, updateData)
    .then(response => { return response })
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const deleteMemo = async (memoId: number) => {
  return clientInstance.delete(`/memos/${memoId}`)
  .then(response => { return response })
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const createMemo = async (createData: CreateData) => {
  return clientInstance.post(`/memos`, createData)
    .then(response => { return response })
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const getMyMemoList = async (memoId: number) => {
  return clientInstance.get(`/memos/mine/${memoId}`)
    .then(response => { return response })
    .catch((error: AxiosError) => {
      throw error;
    });
};