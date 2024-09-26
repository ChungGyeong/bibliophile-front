import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "@/types/user.ts";
import { createCheckNickname } from "@/api/users.ts";

const initialState: UserType = {
  loading: false,
  error: null,
  isNicknameExist: false,
  data: {
    userId: 0,
    email: "",
    nickname: "",
    gender: "",
    birthday: "",
    classification: [],
    profileImage: "",
    oauthServerType: "KAKAO",
  },
};

export const checkNicknameDuplication = createAsyncThunk(
  "user/createCheckNickname",
  async (nickName: string) => {
    return await createCheckNickname(nickName);
  }
);

// Promise
// API 호출 할 때 결과값으로 Promise 객체
// pending, fulfilled, rejected

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkNicknameDuplication.fulfilled, (state, action) => {
        state.isNicknameExist = action.payload.data.exist;
      })
      .addCase(checkNicknameDuplication.rejected, (state, action) => {
        state.isNicknameExist = false;
        state.error = action.error.message || "Nickname check failed";
      });
  },
});

export const userReducer = userSlice.reducer;
