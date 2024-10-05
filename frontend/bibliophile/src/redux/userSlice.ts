import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createCheckNickname, createUser, getUser} from "@/api/users.ts";
import { socialLogin } from "@/api/outh.ts";
import {SignupRequest, UserStateType} from "@/types/user.ts";

const initialState  : UserStateType = {
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
    const response = await socialLogin(oauthServerType, code);
    return response.data
  }
);

export const checkNicknameDuplication = createAsyncThunk(
  "user/createCheckNickname",
  async (nickname: string) => {
    const response = await createCheckNickname(nickname);
    return response.data
  }
);

export const signup = createAsyncThunk("user/signup", async (user: SignupRequest) => {
  const response = await createUser(user);
  return response.data;
});

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  const response = await getUser();
  return response.data;
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { email, oauthServerType, isFirst } = action.payload.data;
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
        state.isNicknameExist = action.payload.data.exist;
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
      })
        .addCase(loadUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
          state.user = action.payload.data;
          state.loading = false;
        })
        .addCase(loadUser.rejected, (state, action) => {
          state.error = action.error.message;
        })
  },
});

export const userReducer = userSlice.reducer;
