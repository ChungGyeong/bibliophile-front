import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStreaks } from "@/api/streaks";
import { StreakType } from '@/types/streaks.ts'

const initialState: StreakType = {
  loading: true,
  Streakdata: [],
  error: null,
};

export const loadStreaks = createAsyncThunk(
  "streak/getStreaks",
  async ({year, month}: {year:number; month: number}) => {
    return await getStreaks(year, month);
  }
);

const streakSlice = createSlice({
  name: "streaks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadStreaks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadStreaks.fulfilled, (state, action) => {
        state.Streakdata = action.payload.data;
        state.loading = false;
      })
      .addCase(loadStreaks.rejected, (state, action) => {
        state.error = action.error.message || "streaks failed";
        state.loading = false;
      });
  },
});

  export const streakReducer = streakSlice.reducer;
