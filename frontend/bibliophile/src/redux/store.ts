import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/redux/userSlice.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
    // memo: memoReudcer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
