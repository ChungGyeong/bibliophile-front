import { clientInstance } from "../libs/http-clients.ts";
import { ApiResponse, MyBookResponse } from "@/types/myBook.ts";

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

export const updateReReadBook = async (myBookId: number) => {
  return await clientInstance
    .patch<ApiResponse<MyBookResponse>>(`/my-book/re-read/${myBookId}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

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
