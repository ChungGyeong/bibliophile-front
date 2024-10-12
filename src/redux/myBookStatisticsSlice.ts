import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MyBookStatisticStateType } from "@/types/myBookStatistics";
import { getMyBookStatistics } from "@/api/myBookStatistics";

const initialState: MyBookStatisticStateType = {
  loading: false,
  error: null,
  statisticList: [],
};

export const loadMyBookStatistics = createAsyncThunk(
  "myBookStatistics/getMyBookStatistics",
  async () => {
    const response = await getMyBookStatistics();
    return response.data;
  }
);

const myBookStatisticsSlice = createSlice({
  name: "myBookStatistics",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(loadMyBookStatistics.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMyBookStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statisticList = action.payload.data;
      })
      .addCase(loadMyBookStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "나의 책 분야별 통계 조회 중 오류가 발생했습니다.";
      });
  },
});

export const myBookStatisticsReducer = myBookStatisticsSlice.reducer;
