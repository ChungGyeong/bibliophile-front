import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ReviewType, CreateData, UpdateReviewData } from "@/types/review.ts";
import { getMyReview, createReview, deleteReview, updateReview, getReviews } from "@/api/review";

const initialState: ReviewType = {
  loading: true,
  error: null,
  data: {
    reviewId: 0,
    content: "",
    star: 0,
    nickname: "",
    isHost: false,
    createdDate: "",
    lastModifyDate: "",
  },
  reviewList: []
};

export const loadMyReview = createAsyncThunk(
  "review/getMyReview",
  async (myBookId: number) => {
    const response = await getMyReview(myBookId);
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  "review/createReview",
  async (createData: CreateData) => {
    const response = await createReview(createData);
    return response.data;
  }
)

export const removeReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId: number) => {
    const response = await deleteReview(reviewId);
    return response.data;
  }
);

export const editReview = createAsyncThunk(
  "review/updateReview",
  async ({reviewId, updateData}: {reviewId:number; updateData: UpdateReviewData}) => {
    const response = await updateReview(reviewId, updateData);
    return response.data;
  }
)

export const loadReviews = createAsyncThunk(
  "review/getReviews",
  async (book: number) => {
    const response = await getReviews(book);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMyReview.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(loadMyReview.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load my review";
        state.loading = false;
      })

      .addCase(addReview.rejected, (state, action) => {
        state.error = action.error.message || "Review creation failed";
      })

      .addCase(removeReview.fulfilled, (state) => {
        state.data = {
          reviewId: 0,
          content: "",
          star: 0,
          nickname: "",
          isHost: false,
          createdDate: "",
          lastModifyDate: "",
        };
      })
      .addCase(removeReview.rejected, (state, action) => {
        state.error = action.error.message || "Review delete failed";
      })

      .addCase(editReview.fulfilled, (state, action) => {
        const { content, star } = action.payload.data;
        state.data = {
          ...state.data,
          content,
          star,
        };
      })
      .addCase(editReview.rejected, (state, action) => {
        state.error = action.error.message || "Review update failed";
      })

      .addCase(loadReviews.fulfilled, (state, action) => {
        state.reviewList = action.payload.data;
        state.loading = false;
      })
      .addCase(loadReviews.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load memo list";
        state.loading = false;
      });
  },
});

export const reviewReducer = reviewSlice.reducer;