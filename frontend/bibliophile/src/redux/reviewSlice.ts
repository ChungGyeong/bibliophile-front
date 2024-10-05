import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ReviewType, CreateData, UpdateReviewData } from "@/types/review.ts";
import { getMyReview, createReview, deleteReview, updateReview } from "@/api/review";

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
  }
};

export const loadMyReview = createAsyncThunk(
  "review/getMyReview",
  async (myBookId: number) => {
    return await getMyReview(myBookId);
  }
);

export const addReview = createAsyncThunk(
  "review/createReview",
  async (createData: CreateData) => {
    return await createReview(createData);
  }
)

export const removeReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId: number) => {
    return await deleteReview(reviewId);
  }
);

export const editReview = createAsyncThunk(
  "review/updateReview",
  async ({reviewId, updateData}: {reviewId:number; updateData: UpdateReviewData}) => {
    return await updateReview(reviewId, updateData);
  }
)

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
  },
});

export const reviewReducer = reviewSlice.reducer;