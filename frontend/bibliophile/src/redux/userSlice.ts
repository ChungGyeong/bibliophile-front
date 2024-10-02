import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersRequest, UserType } from "@/types/user.ts";
import { createCheckNickname, createUser } from "@/api/users.ts";
import { socialLogin } from "@/api/outh.ts";

const initialState: UserType = {
  isLoggedIn: false,
  loading: false,
  error: undefined,
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
  async (nickname: string) => {
    return await createCheckNickname(nickname);
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
        const { email, oauthServerType, isFirst } = action.payload.data.data;
        state.user.email = email;
        state.user.oauthServerType = oauthServerType;
        state.isFirst = isFirst;
        state.isLoggedIn = true;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(checkNicknameDuplication.fulfilled, (state, action) => {
        state.isNicknameExist = action.payload.data.data.exist;
        state.error = undefined;
      })
      .addCase(checkNicknameDuplication.rejected, (state, action) => {
        state.isNicknameExist = false;
        state.error = action.error.message;
      })
      .addCase(signup.pending, state => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { userId, birthday, classification, gender, nickname, profileImage } =
          action.payload.data;
        state.user = {
          ...state.user,
          userId,
          birthday,
          classification,
          gender,
          nickname,
          profileImage,
        };
        state.loading = false;
        state.error = undefined;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;
