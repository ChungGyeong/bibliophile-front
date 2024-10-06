import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/redux/userSlice.ts";
import { memoReducer } from "@/redux/memoSlice.ts";
import { imageReducer } from "@/redux/imageSlice.ts";
import { reportReducer } from "@/redux/reportSlice";
import { reviewReducer } from "@/redux/reviewSlice";
import { myBookReducer } from "@/redux/myBookSlice.ts";
import { bookReducer } from "@/redux/bookSlice.ts";
import { myBookStatisticsReducer } from "@/redux/myBookStatisticsSlice.ts";
import { bookmarkReducer } from "@/redux/bookmarkSlice.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
    image: imageReducer,
    report: reportReducer,
    review: reviewReducer,
    book: bookReducer,
    myBook: myBookReducer,
    myBookStatistics: myBookStatisticsReducer,
    bookmark: bookmarkReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
