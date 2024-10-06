import { clientInstance } from "@/libs/http-clients.ts";
import {
  BookResponseType,
  PopularBookRequestType,
  RecommendBookRequestType,
} from "@/types/books.ts";

export const getBookDetailByBookId = async (bookId: number) => {
  return await clientInstance
    .get<ApiResponseType<BookResponseType>>(`/book/${bookId}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getRecommendedBookList = async (requestBody: RecommendBookRequestType) => {
  return await clientInstance
    .post("/book/recommend/tag", requestBody)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getPopularBookList = async (requestBody: PopularBookRequestType) => {
  return await clientInstance
    .post("/book/popular", requestBody)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
