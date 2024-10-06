import { clientInstance } from "@/libs/http-clients";
import { ApiResponse, BookmarkResponse } from "@/types/bookmarks";

// 북마크 리스트 조회
export const getBookmarkList = async () => {
  return await clientInstance
    .get<ApiResponse<BookmarkResponse[]>>("/bookmarks")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 북마크 추가
export const createBookmark = async (bookId: number) => {
  return await clientInstance
    .post<ApiResponse<BookmarkResponse>>("/bookmarks", { bookId })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 북마크 삭제
export const deleteBookmark = async (bookId: number) => {
  return await clientInstance
    .delete(`/bookmarks/${bookId}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
