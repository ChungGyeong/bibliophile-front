import { AxiosError } from "axios";
import { fileUploadInstance } from "@/libs/http-clients.ts";

export const createImage = async (formData: FormData) => {
  try {
    return await fileUploadInstance.post('/file/image', formData);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "이미지를 불러오던 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}