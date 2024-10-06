export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timeStamp: string;
}

export interface MyBookStateType {
  loading: boolean;
  error: string | null;
  bookList: MyBookResponse[];
  book: MyBookResponse | null;
}

export interface MyBookResponse {
  myBookId: number;
  bookId: number;
  totalPage: number;
  readingPage: number;
  readingPercent: number;
  totalReadingTime: string;
  readingStatus: "READING" | "READ" | "UNREAD";
  isBookmarked: boolean;
  title: string;
  thumbnail: string;
  authors: string;
  publisher: string;
  contents: string;
  completionReadingTime: string;
  createdDate: string;
  lastModifyDate: string;
}
