export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timeStamp: string;
}

export interface BookmarkStateType {
  loading: boolean;
  error: string | null;
  bookmarkList: BookmarkResponse[];
  bookmark: BookmarkResponse | null;
}

export interface BookmarkResponse {
  bookId: number;
  title: string;
  thumbnail: string;
  authors: string;
  publisher: string;
  createdDate: string;
  lastModifyDate: string;
}
