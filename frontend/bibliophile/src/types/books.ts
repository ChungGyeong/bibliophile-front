import { ClassificationType } from "@/types/user.ts";

export interface BookStateType {
  loading: boolean;
  error: string | undefined;
  book: BookResponseType;
  recommendedBookList: BookResponseType[];
  popularBookList: BookResponseType[];
}

export interface BookResponseType {
  bookId: number;
  contents: string;
  isbn: string;
  kdc: string;
  title: string;
  authors: string;
  pageNumber: number;
  thumbnail: string;
  publisher: string;
  readingStatus: "UNREAD" | "READING" | "READ";
  isBookmarked: boolean;
}

export interface RecommendBookRequestType {
  id: number; // userId
  tags: ClassificationType[];
}

export interface PopularBookRequestType {
  page: number;
  size: number;
  sort: string[];
}
