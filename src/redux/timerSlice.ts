import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateData, TimerType } from "@/types/timer.ts";
import { createTimer, getTimeList } from "@/api/timer";

const initialState: TimerType = {
  loading: false,
  error: null,
  data: []
};

export const addTimer = createAsyncThunk(
  "timer/createTimer",
  async (createData: CreateData) => {
    const response = await createTimer(createData);
    return response.data;
  }
)

export const loadTimerList = createAsyncThunk(
  "timer/getTimeList",
  async () => {
    const response = await getTimeList();
    return response.data;
  }
);

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTimer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTimer.rejected, (state, action) => {
        state.error = action.error.message || "Timer creation failed";
        state.loading = false;
      })

      .addCase(loadTimerList.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(loadTimerList.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load Timer list";
        state.loading = false;
      });
    },
  });
  
  export const timerReducer = timerSlice.reducer;