import { clientInstance } from "@/libs/http-clients.ts";
import { BookResponse } from "@/types/books.ts";

export const getBookDetailByBookId = async (bookId: number) => {
  return await clientInstance
    .get<ApiResponseType<BookResponse>>(`/book/${bookId}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
