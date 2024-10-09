import {
  BookStateType,
  PopularBookRequestType,
  RecommendBookRequestType,
  SearchByTitleRequestType,
} from "@/types/books.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getBookByIsbn,
  getBookDetailByBookId,
  getBookListByTitle,
  getPopularBookList,
  getRecommendedBookList,
  getRelatedBookList,
} from "@/api/book.ts";

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
  isLoadingRelatedBookList: false,
  relatedBookList: [],
  searchedBookList: [],
  hasMoreSearchResult: true,
  searchedBookId: undefined,
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
  async ({ gender, ageGroup }: PopularBookRequestType) => {
    const response = await getPopularBookList(gender, ageGroup);
    return response.data;
  }
);

export const loadBookListByTitle = createAsyncThunk(
  "book/loadBookListByTitle",
  async ({ title: title, page: page }: SearchByTitleRequestType) => {
    const response = await getBookListByTitle(title, page);
    return response.data;
  }
);

export const loadBookByIsbn = createAsyncThunk("book/loadBookByIsbn", async (isbn: string) => {
  const response = await getBookByIsbn(isbn);
  return response.data;
});

export const loadRelatedBookList = createAsyncThunk(
  "book/loadRelatedBookList",
  async (bookId: number) => {
    const response = await getRelatedBookList(bookId);
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    initSearchBookList: state => {
      state.searchedBookList = [];
    },
  },
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
        state.recommendedBookList = action.payload.data;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loadRecommendedBookList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadPopularBookList.pending, state => {
        state.loading = true;
      })
      .addCase(loadPopularBookList.fulfilled, (state, action) => {
        state.popularBookList = action.payload.data;
        state.error = undefined;
        state.loading = false;
      })
      .addCase(loadPopularBookList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadRelatedBookList.pending, state => {
        state.isLoadingRelatedBookList = true;
      })
      .addCase(loadRelatedBookList.fulfilled, (state, action) => {
        state.relatedBookList = action.payload.data;
        state.error = undefined;
        state.isLoadingRelatedBookList = false;
      })
      .addCase(loadRelatedBookList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadBookListByTitle.pending, state => {
        state.loading = true;
      })
      .addCase(loadBookListByTitle.fulfilled, (state, action) => {
        if (action.payload.data.length === 0) state.hasMoreSearchResult = false;
        else {
          state.searchedBookList = [...state.searchedBookList, ...action.payload.data];
          state.hasMoreSearchResult = true;
        }
        state.error = undefined;
        state.loading = false;
      })
      .addCase(loadBookListByTitle.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadBookByIsbn.pending, state => {
        state.loading = true;
      })
      .addCase(loadBookByIsbn.fulfilled, (state, action) => {
        state.searchedBookId = action.payload.data.bookId;
        state.error = undefined;
        state.loading = false;
      })
      .addCase(loadBookByIsbn.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { initSearchBookList } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
