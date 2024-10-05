export interface MemoType {
  loading: boolean;
  error: string | null;
  data: MemoResponse;
  myMemoList: MemoResponse[];
}

export interface MemoResponse {
  memoId: number;
  content: string;
  memoPage: number;
  memoImgUrlList: string[];
  createdDate: string;
  lastModifyDate: string;
}

export interface UpdateMemoData {
  memoPage: number | null;
  content: string;
  memoImgUrl: string[];
}

export interface CreateData {
  myBookId: number;
  content: string;
  memoPage: number;
  memoImgUrl: string[];
}