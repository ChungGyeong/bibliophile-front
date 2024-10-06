import { clientInstance } from "../libs/http-clients.ts";
import { ApiResponse, MyBookResponse } from "@/types/myBook.ts";
import { AxiosError } from "axios";

// 나의 책 리스트 조회
export const getMyBookList = async (status: "READ" | "READING" | "UNREAD") => {
  return await clientInstance
    .get<ApiResponse<MyBookResponse[]>>("/my-book", {
      params: { status: status },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 나의 책 단건 조회
export const getMyBook = async (myBookId: number) => {
  return await clientInstance
    .get<ApiResponse<MyBookResponse>>(`/my-book/${myBookId}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 나의 책장에서 보기
export const getMyBookId = async (bookId: number) => {
  return await clientInstance
    .get<ApiResponse<MyBookResponse>>(`/my-book/book/${bookId}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 나의 책 추가
export const createMyBook = async (bookId: number) => {
  return await clientInstance
    .post<ApiResponse<MyBookResponse>>("/my-book", { bookId })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 나의 책 상태 변경
export const updateMyBookStatus = async (
  myBookId: number,
  status: "READ" | "READING" | "UNREAD"
) => {
  return await clientInstance
    .patch<ApiResponse<MyBookResponse>>(`/my-book/status/${myBookId}`, {
      status,
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 나의 책 현재까지 읽은 페이지 변경
export const updateReadingPage = async (myBookId: number, page: number) => {
  return await clientInstance
    .patch<ApiResponse<MyBookResponse>>(`/my-book/page/${myBookId}`, {
      page,
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 나의 책 삭제
export const deleteMyBook = async (myBookId: number) => {
  return await clientInstance
    .delete(`/my-book/${myBookId}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
