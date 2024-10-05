import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createImage } from "@/api/image";

interface ImageState {
  loading: boolean;
  error: string | null;
  files: string[];
}

const initialState: ImageState = {
  loading: false,
  error: null,
  files: [],
};

export const addImage = createAsyncThunk<string[], FormData>(
  "file/createImage",
  async (formData: FormData) => {
    const response = await createImage(formData);
    return response.data;
  }
);


const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addImage.fulfilled, (state, action) => {
      console.log('image hi')
      state.files = action.payload;
      state.loading = false;
    })
    .addCase(addImage.rejected, (state, action) => {
      state.error = action.error.message || "image failed";
      state.loading = false;
    });
  },
})

export const imageReducer = imageSlice.reducer;