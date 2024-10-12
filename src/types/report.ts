export interface ReportType {
  loading: boolean;
  error: string | null;
  data: ReportResponse;
}

export interface ReportResponse {
  bookReportId: number;
  content: string;
  bookReportImgUrlList: string[];
  createdDate: string;
  lastModifyDate: string;
}

export interface UpdateReportData {
  content: string;
  bookReportImgUrl: string[];
}

export interface CreateData {
  myBookId: number;
  content: string;
  ImgUrl: string[];
}