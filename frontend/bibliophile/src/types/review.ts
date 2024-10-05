export interface ReviewType {
  loading: boolean;
  error: string | null;
  data: ReviewResponse;
}

export interface ReviewResponse {
  reviewId: number;
  content: string;
  star: number;
  nickname: string;
  isHost: boolean;
  createdDate: string;
  lastModifyDate: string;
}

export interface CreateData {
  content: string;
  star: number;
  bookId: number;
}

export interface UpdateReviewData {
  content: string;
  star: number;
}