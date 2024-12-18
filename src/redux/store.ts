import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/redux/userSlice.ts";
import { memoReducer } from "@/redux/memoSlice.ts";
import { imageReducer } from "@/redux/imageSlice.ts";
import { reportReducer } from "@/redux/reportSlice";
import { reviewReducer } from "@/redux/reviewSlice";
import { streakReducer } from "@/redux/streakSlice";
import { bookReducer } from "@/redux/bookSlice.ts";
import { myBookReducer } from "@/redux/myBookSlice.ts";
import { myBookStatisticsReducer } from "@/redux/myBookStatisticsSlice.ts";
import { bookmarkReducer } from "@/redux/bookmarkSlice.ts";
import { timerReducer } from "@/redux/timerSlice";
import { foxReducer } from "@/redux/foxSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
    image: imageReducer,
    report: reportReducer,
    review: reviewReducer,
    streak: streakReducer,
    book: bookReducer,
    myBook: myBookReducer,
    myBookStatistics: myBookStatisticsReducer,
    bookmark: bookmarkReducer,
    timer: timerReducer,
    fox: foxReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
