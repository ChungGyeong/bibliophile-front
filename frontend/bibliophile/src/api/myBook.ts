import { clientInstance } from "../libs/http-clients.ts";
import { ApiResponse, MyBookResponse } from "@/types/myBook.ts";
import { AxiosError } from "axios";

// 나의 책 리스트 조회
export const getMyBookList = async (status: "READ" | "READING" | "UNREAD") => {
  try {
    return await clientInstance.get<ApiResponse<MyBookResponse[]>>("/my-book", {
      params: { status: status },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message || "나의 책 리스트 확인 중 오류가 발생했습니다."
      );
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 나의 책 단건 조회
export const getMyBook = async (myBookId: number) => {
  try {
    return await clientInstance.get<ApiResponse<MyBookResponse>>(`/my-book/${myBookId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "책 정보 확인 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 나의 책장에서 보기
export const getMyBookId = async (bookId: number) => {
  try {
    return await clientInstance.get<ApiResponse<MyBookResponse>>(`/my-book/book/${bookId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "myBookId를 얻는 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 나의 책 추가
export const createMyBook = async (bookId: number) => {
  try {
    return await clientInstance.post<ApiResponse<MyBookResponse>>("/my-book", { bookId });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "나의 책 추가 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 나의 책 상태 변경
export const updateMyBookStatus = async (
  myBookId: number,
  status: "READ" | "READING" | "UNREAD"
) => {
  try {
    return await clientInstance.patch<ApiResponse<MyBookResponse>>(`/my-book/status/${myBookId}`, {
      status,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "책 상태 변경 중 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 나의 책 현재까지 읽은 페이지 변경
export const updateReadingPage = async (myBookId: number, page: number) => {
  try {
    return await clientInstance.patch<ApiResponse<MyBookResponse>>(`/my-book/page/${myBookId}`, {
      page,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message || "읽은 책 페이지 업데이트 중 오류가 발생했습니다."
      );
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 나의 책 삭제
export const deleteMyBook = async (myBookId: number) => {
  try {
    return await clientInstance.delete(`/my-book/${myBookId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message || "나의 책에서 삭제하는 중 오류가 발생했습니다."
      );
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
