interface SearchResponse {
  bookId: number;
  contents: string;
  isbn: string;
  kdc: string;
  title: string;
  authors: string;
  page_number: string;
  thumbnail: string;
  publisher: string;
  isBookmarked: boolean;
  readingStatus: "UNREAD" | "READING" | "READ";
}
