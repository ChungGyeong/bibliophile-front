import { clientInstance } from "@/libs/http-clients.ts";
import {
  BookResponseType,
  RecommendBookRequestType,
  RelatedBookListRequestType,
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

export const getBookListByTitle = async (title: string, page: number) => {
  return await clientInstance
    .get<ApiResponseType<BookResponseType[]>>("/book/search", {
      params: {
        title: title,
        page: page,
        size: 8,
      },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getBookByIsbn = async (isbn: string) => {
  return await clientInstance
    .get<ApiResponseType<BookResponseType>>("/book", {
      params: {
        isbn: isbn,
      },
    })
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

export const getPopularBookList = async (gender: "MAN" | "WOMAN", ageGroup: number) => {
  return await clientInstance
    .get("/book/popular", {
      params: {
        gender: gender,
        ageGroup: ageGroup,
        page: 0,
        size: 6,
      },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getRelatedBookList = async (requestBody: RelatedBookListRequestType) => {
  return await clientInstance
    .post("/book/recommend/content", requestBody)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
