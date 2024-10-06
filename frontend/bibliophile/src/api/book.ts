import { clientInstance } from "@/libs/http-clients.ts";
import { BookResponseType, RecommendBookRequestType } from "@/types/books.ts";

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
