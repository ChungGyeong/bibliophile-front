export interface CreateData {
  myBookId: number;
  startTime: string;
  endTime: string;
}

export interface TimerType {
  loading: boolean;
  error: string | null;
  data: TimerResponse[];
}

export interface TimerResponse {
  month: number;
  readingTime: string;
}

