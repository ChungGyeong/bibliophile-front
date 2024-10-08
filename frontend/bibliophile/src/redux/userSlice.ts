import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCheckNickname,
  createUser,
  deleteUser,
  getUser,
  getWordCloud,
  leaveAccount,
  updateUser,
} from "@/api/users.ts";
import { socialLogin } from "@/api/outh.ts";
import { SignupRequest, UpdateUserRequest, UserStateType } from "@/types/user.ts";

const initialState: UserStateType = {
  isLoggedIn: undefined,
  loading: false,
  isWordCloudLoading: false,
  wordCloudImageUrl: "",
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
    return response.data;
  }
);

export const checkNicknameDuplication = createAsyncThunk(
  "user/createCheckNickname",
  async (nickname: string) => {
    const response = await createCheckNickname(nickname);
    return response.data;
  }
);

export const signup = createAsyncThunk("user/signup", async (user: SignupRequest) => {
  const response = await createUser(user);
  return response.data;
});

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  const response = await getUser();
  return response.data;
});

export const editUser = createAsyncThunk("user/editUser", async (user: UpdateUserRequest) => {
  const response = await updateUser(user);
  return response.data;
});

export const removeUser = createAsyncThunk("user/removeUser", async () => {
  const response = await deleteUser();
  return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await leaveAccount();
  return response.data;
});

export const loadWordCloud = createAsyncThunk("user/loadWordCloud", async () => {
  const response = await getWordCloud();
  return response.data;
});

export const userSlice = createSlice({
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
        state.isLoggedIn = true;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUser.pending, state => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editUser.pending, state => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeUser.pending, state => {
        state.loading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.error = undefined;
        state.loading = false;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.isLoggedIn = undefined;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadWordCloud.pending, state => {
        state.isWordCloudLoading = true;
      })
      .addCase(loadWordCloud.fulfilled, (state, action) => {
        state.isWordCloudLoading = false;
        state.wordCloudImageUrl = action.payload.data.wordCloud;
      })
      .addCase(loadWordCloud.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;
