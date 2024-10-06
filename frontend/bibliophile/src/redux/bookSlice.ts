import { BookStateType, PopularBookRequestType, RecommendBookRequestType } from "@/types/books.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBookDetailByBookId, getPopularBookList, getRecommendedBookList } from "@/api/book.ts";

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
  recommendedBookList: [],
  popularBookList: [],
};

export const loadBookDetailByBookId = createAsyncThunk(
  "book/loadBookDetailByBookId",
  async (bookId: number) => {
    const response = await getBookDetailByBookId(bookId);
    return response.data;
  }
);

export const loadRecommendedBookList = createAsyncThunk(
  "book/loadRecommendedBookList",
  async (requestBody: RecommendBookRequestType) => {
    const response = await getRecommendedBookList(requestBody);
    return response.data;
  }
);

export const loadPopularBookList = createAsyncThunk(
  "book/loadPopularBookList",
  async (requestBody: PopularBookRequestType) => {
    const response = await getPopularBookList(requestBody);
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadBookDetailByBookId.pending, state => {
        state.loading = true;
      })
      .addCase(loadBookDetailByBookId.fulfilled, (state, action) => {
        state.book = action.payload.data;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loadBookDetailByBookId.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadRecommendedBookList.pending, state => {
        state.loading = true;
      })
      .addCase(loadRecommendedBookList.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedBookList = action.payload.data;
      })
      .addCase(loadRecommendedBookList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadPopularBookList.pending, state => {
        state.loading = true;
      })
      .addCase(loadPopularBookList.fulfilled, (state, action) => {
        state.loading = false;
        state.popularBookList = action.payload.data;
      })
      .addCase(loadPopularBookList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const bookReducer = bookSlice.reducer;
