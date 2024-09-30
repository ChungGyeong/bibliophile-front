import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "@/types/user.ts";
import { createCheckNickname } from "@/api/users.ts";
import { socialLogin } from "@/api/outh.ts";

const initialState: UserType = {
  isLoggedIn: false,
  loading: false,
  error: null,
  isNicknameExist: false,
  isFirst: false,
  user: {
    userId: 0,
    email: "",
    nickname: "",
    gender: "MAN",
    birthday: "",
    classification: [],
    profileImage: "",
    oauthServerType: "KAKAO",
  },
};

export const login = createAsyncThunk(
  "user/login",
  async ({ oauthServerType, code }: { oauthServerType: string; code: string }) => {
    return await socialLogin(oauthServerType, code);
  }
);

export const checkNicknameDuplication = createAsyncThunk(
  "user/createCheckNickname",
  async (nickName: string) => {
    return await createCheckNickname(nickName);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.email = action.payload.data.email;
        state.user.oauthServerType = action.payload.data.oauthServerType;
        state.isFirst = action.payload.data.isFirst;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || "Social Login failed";
      })
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
