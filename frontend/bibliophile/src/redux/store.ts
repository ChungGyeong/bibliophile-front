import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/redux/userSlice.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
    // memo: memoReudcer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
