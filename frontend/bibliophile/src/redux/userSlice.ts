import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersRequest, UserType } from "@/types/user.ts";
import { createCheckNickname, createUser } from "@/api/users.ts";
import { socialLogin } from "@/api/outh.ts";

const initialState: UserType = {
  isLoggedIn: false,
  loading: false,
  error: null,
  isNicknameExist: false,
  isFirst: true,
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

export const signup = createAsyncThunk("user/signup", async (user: UsersRequest) => {
  return await createUser(user);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user.email = action.payload.data.data.email;
        state.user.oauthServerType = action.payload.data.data.oauthServerType;
        state.isFirst = action.payload.data.data.isFirst;
        state.isLoggedIn = true;
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
      })
      .addCase(signup.pending, state => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user.userId = action.payload.data.userId;
        state.user.birthday = action.payload.data.birthday;
        state.user.classification = action.payload.data.classification;
        state.user.gender = action.payload.data.gender;
        state.user.nickname = action.payload.data.nickname;
        state.user.profileImage = action.payload.data.profileImage;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message || "Social Login failed";
      });
  },
});

export const userReducer = userSlice.reducer;
