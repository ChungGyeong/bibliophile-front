import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookmarkStateType } from "@/types/bookmarks";
import { getBookmarkList, createBookmark, deleteBookmark } from "@/api/bookmarks";

const initialState: BookmarkStateType = {
  loading: false,
  error: null,
  bookmarkList: [],
  bookmark: null,
};

export const loadBookmarkList = createAsyncThunk("bookmarks/getBookmarkList", async () => {
  const response = await getBookmarkList();
  return response.data;
});

export const addBookmark = createAsyncThunk("bookmarks/addBookmark", async (bookId: number) => {
  const response = await createBookmark(bookId);
  return response.data;
});

export const removeBookmark = createAsyncThunk(
  "bookmarks/deleteBookmark",
  async (bookId: number) => {
    const response = await deleteBookmark(bookId);
    return response.data;
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadBookmarkList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBookmarkList.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarkList = action.payload.data;
      })
      .addCase(loadBookmarkList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "북마크 리스트 조회 중 오류가 생겼습니다.";
      })

      .addCase(addBookmark.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmark = action.payload.data;
      })
      .addCase(addBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "북마크 추가 중 오류가 생겼습니다.";
      })

      .addCase(removeBookmark.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmark = action.payload.data;
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "북마크 삭제 중 오류가 생겼습니다.";
      });
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
