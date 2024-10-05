import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/redux/userSlice.ts";
import { memoReducer } from "@/redux/memoSlice.ts";
import { imageReducer } from "@/redux/imageSlice.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
    image: imageReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
