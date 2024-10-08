import { ClassificationType } from "@/types/user.ts";

export interface BookStateType {
  loading: boolean;
  error: string | undefined;
  book: BookResponseType;
  recommendedBookList: BookResponseType[];
  popularBookList: BookResponseType[];
  isLoadingRelatedBookList: boolean;
  relatedBookList: BookResponseType[];
  searchedBookList: BookResponseType[];
  hasMoreSearchResult: boolean;
  searchedBookId: number | undefined;
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
  tags: ClassificationType[];
}

export interface PopularBookRequestType {
  gender: "MAN" | "WOMAN";
  ageGroup: AgeType;
}

export interface SearchByTitleRequestType {
  title: string;
  page: number;
}

export interface RelatedBookListRequestType {
  title: string;
  requestNumber: number;
}

export type AgeType = 10 | 20 | 30 | 40 | 50;
