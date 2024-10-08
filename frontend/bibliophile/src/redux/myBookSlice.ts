import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MyBookStateType } from "@/types/myBook";
import {
  getMyBookList,
  getMyBook,
  createMyBook,
  updateMyBookStatus,
  updateReadingPage,
  deleteMyBook,
  getMyBookId,
} from "@/api/myBook";

const initialState: MyBookStateType = {
  loading: false,
  error: null,
  bookList: [],
  book: null,
};

export const loadMyBookList = createAsyncThunk(
  "myBook/getMyBookList",
  async ({ status }: { status: "READ" | "READING" | "UNREAD" }) => {
    const response = await getMyBookList(status);
    return response.data;
  }
);

export const loadMyBook = createAsyncThunk("myBook/getMyBook", async (myBookId: number) => {
  const response = await getMyBook(myBookId);
  return response.data;
});

export const loadMyBookId = createAsyncThunk("myBook/getMyBookId", async (bookId: number) => {
  const response = await getMyBookId(bookId);
  return response.data;
});

export const addMyBook = createAsyncThunk("myBook/createMyBook", async (bookId: number) => {
  const response = await createMyBook(bookId);
  return response.data;
});

export const editMyBookStatus = createAsyncThunk(
  "myBook/updateMyBookStatus",
  async ({ myBookId, status }: { myBookId: number; status: "READ" | "READING" | "UNREAD" }) => {
    const response = await updateMyBookStatus(myBookId, status);
    return response.data;
  }
);

export const editReadingPage = createAsyncThunk(
  "myBook/updateReadingPage",
  async ({ myBookId, page }: { myBookId: number; page: number }) => {
    const response = await updateReadingPage(myBookId, page);
    return response.data;
  }
);

export const removeMyBook = createAsyncThunk("myBook/deleteMyBook", async (myBookId: number) => {
  return await deleteMyBook(myBookId);
});

const myBookSlice = createSlice({
  name: "myBook",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(loadMyBookList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMyBookList.fulfilled, (state, action) => {
        state.loading = false;
        state.bookList = action.payload.data;
      })
      .addCase(loadMyBookList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "나의 책 리스트 확인 중 오류가 발생했습니다.";
      })

      .addCase(loadMyBook.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMyBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload.data;
      })
      .addCase(loadMyBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "책 정보 확인 중 오류가 발생했습니다.";
      })

      .addCase(loadMyBookId.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMyBookId.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload.data;
      })
      .addCase(loadMyBookId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "myBookId를 얻는 중 오류가 발생했습니다.";
      })

      .addCase(addMyBook.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMyBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload.data;
      })
      .addCase(addMyBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "나의 책 추가 중 오류가 발생했습니다.";
      })

      .addCase(editMyBookStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMyBookStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload.data;
      })
      .addCase(editMyBookStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "책 상태 변경 중 오류가 발생했습니다.";
      })

      .addCase(editReadingPage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editReadingPage.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload.data;
      })
      .addCase(editReadingPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "읽은 책 페이지 업데이트 중 오류가 발생했습니다.";
      })

      .addCase(removeMyBook.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMyBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload.data;
      })
      .addCase(removeMyBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "나의 책에서 삭제하는 중 오류가 발생했습니다.";
      });
  },
});

export const myBookReducer = myBookSlice.reducer;
