export interface StreakType {
  loading: boolean;
  error: string | null;
  Streakdata: StreakResponse[];
}

export interface StreakResponse {
  streakDate: string;
  totalCount: number;
}