import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MemoType, UpdateMemoData, CreateData } from "@/types/memo.ts";
import { getMemo, updateMemo, deleteMemo, createMemo, getMyMemoList } from "@/api/memos";

const initialState: MemoType = {
  loading: true,
  error: null,
  data: {
    memoId: 0,
    content: "",
    memoPage: 0,
    memoImgUrlList: [],
    createdDate: "",
    lastModifyDate: ""
  },
  myMemoList: []
};

export const loadMemo = createAsyncThunk(
  "memo/getMemo",
  async (memoId: number) => {
    const response = await getMemo(memoId);
    return response.data;
  }
);

export const editMemo = createAsyncThunk(
  "memo/updateMemo",
  async ({memoId, updateData}: {memoId:number; updateData: UpdateMemoData}) => {
    const response = await updateMemo(memoId, updateData);
    return response.data;
  }
)

export const removeMemo = createAsyncThunk(
  "memo/deleteMemo",
  async (memoId: number) => {
    const response = await deleteMemo(memoId);
    return response.data;
  }
);

export const addMemo = createAsyncThunk(
  "memo/createMemo",
  async (createData: CreateData) => {
    const response = await createMemo(createData);
    return response.data;
  }
)

export const loadMyMemoList = createAsyncThunk(
  "memo/getMyMemoList",
  async (memoId: number) => {
    const response = await getMyMemoList(memoId);
    return response.data;
  }
);

const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMemo.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMemo.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(loadMemo.rejected, (state, action) => {
        state.error = action.error.message || "Memo failed";
        state.loading = false;
      })

      .addCase(editMemo.fulfilled, (state, action) => {
        const { memoPage, content, memoImgUrl } = action.payload.data;
        state.data = {
          ...state.data,
          memoPage,
          content,
          memoImgUrlList: memoImgUrl,
        };
      })
      .addCase(editMemo.rejected, (state, action) => {
        state.error = action.error.message || "Memo update failed";
      })

      .addCase(removeMemo.fulfilled, (state) => {
        state.data = {
          memoId: 0,
          content: "",
          memoPage: 0,
          memoImgUrlList: [],
          createdDate: "",
          lastModifyDate: "",
        };
      })
      .addCase(removeMemo.rejected, (state, action) => {
        state.error = action.error.message || "Memo delete failed";
      })

      .addCase(addMemo.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          memoId: action.payload.data.memoId,
          memoPage: action.payload.data.memoPage,
          content: action.payload.data.content,
          memoImgUrlList: action.payload.data.memoImgUrl,
        };
      })
      .addCase(addMemo.rejected, (state, action) => {
        state.error = action.error.message || "Memo creation failed";
      })

      .addCase(loadMyMemoList.fulfilled, (state, action) => {
        state.myMemoList = action.payload.data;
        state.loading = false;
      })
      .addCase(loadMyMemoList.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load memo list";
        state.loading = false;
      });
  },
});

export const memoReducer = memoSlice.reducer;