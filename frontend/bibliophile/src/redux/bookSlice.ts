import { BookStateType } from "@/types/books.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBookDetailByBookId } from "@/api/book.ts";

const initialState: BookStateType = {
  loading: false,
  error: undefined,
  book: {
    bookId: 0,
    contents: "",
    isbn: "",
    kdc: "",
    title: "",
    authors: "",
    pageNumber: 1,
    thumbnail: "",
    publisher: "",
    readingStatus: "UNREAD",
    isBookmarked: false,
  },
};

export const loadBookDetailByBookId = createAsyncThunk(
  "book/loadBookDetailByBookId",
  async (bookId: number) => {
    const response = await getBookDetailByBookId(bookId);
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadBookDetailByBookId.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadBookDetailByBookId.fulfilled, (state, action) => {
      state.book = action.payload.data;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(loadBookDetailByBookId.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const bookReducer = bookSlice.reducer;
