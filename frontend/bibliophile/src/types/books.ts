export interface BookStateType {
  loading: boolean;
  error: string | undefined;
  book: BookResponse;
}

export interface BookResponse {
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
