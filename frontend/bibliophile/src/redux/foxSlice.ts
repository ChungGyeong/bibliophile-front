import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FoxStateType } from "@/types/fox";
import { getFox, updateFoxFeed } from "@/api/fox";

const initialState: FoxStateType = {
  loading: false,
  error: null,
  fox: {
    foxId: 0,
    level: 0,
    exp: 0,
    feedCount: 0,
    percent: 0,
    foxType: "BABY",
    foxStatus: "GOOD",
    createdDate: "",
    lastModifyDate: "",
  },
};

export const loadFox = createAsyncThunk("fox/getFox", async () => {
  const response = await getFox();
  return response.data;
});

export const editFoxFeed = createAsyncThunk("fox/updateFoxFeed", async () => {
  const response = await updateFoxFeed();
  return response.data;
});

const foxSlice = createSlice({
  name: "fox",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(loadFox.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFox.fulfilled, (state, action) => {
        state.loading = false;
        state.fox = action.payload.data;
      })
      .addCase(loadFox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "내 여우를 불러오는 중 오류가 발생했습니다.";
      })

      .addCase(editFoxFeed.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editFoxFeed.fulfilled, (state, action) => {
        state.loading = true;
        state.fox = action.payload.data;
      })
      .addCase(editFoxFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "여우에게 밥을 주는 중 오류가 발생했습니다.";
      });
  },
});

export const foxReducer = foxSlice.reducer;
