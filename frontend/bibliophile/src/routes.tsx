import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.tsx";
import PageLayout from "./layout/PageLayout.tsx";
import DefaultLayout from "./layout/DefaultLayout.tsx";
import MyBookLayout from "./layout/MyBookLayout.tsx";
import MyBookReadingPage from "./pages/MyBookReadingPage.tsx";
import MyBookFinishPage from "./pages/MyBookFinishPage.tsx";
import MyBookLikePage from "./pages/MyBookLikePage.tsx";
import BookDetailPage from "./pages/BookDetailPage.tsx";
import MemoPage from "./pages/MemoPage.tsx";
import ReportPage from "./pages/ReportPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "@/pages/SignupPage.tsx";
import ReadingBookDetailPage from "@/pages/readingBookDetailPage/ReadingBookDetailPage.tsx";
import SearchPage from "@/pages/searchPage/SearchPage.tsx";
import MyPage from "@/pages/myPage/MyPage.tsx";
import BarcodePage from "@/pages/searchPage/BarcodePage.tsx";
import BookSuggestionPage from "@/pages/BookSuggestionPage.tsx";
import SocialLogin from "@/pages/SocialLogin.tsx";
import PrivacyPolicyPage from "@/pages/myPage/PrivacyPolicyPage.tsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const getIsAuthenticated = (): boolean => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return !!isAuthenticated;
};

const AppRoutes = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    typeof isLoggedIn === "undefined" && !getIsAuthenticated() && navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/login">
        <Route index element={<DefaultLayout page={<LoginPage />} />} />
        <Route path=":provider" element={<SocialLogin />} />
      </Route>

      <Route path="/signup" element={<DefaultLayout page={<SignupPage />} />} />
      <Route path="/" element={<PageLayout page={<HomePage />} />} />

      <Route path="/mybook">
        <Route path="reading" element={<MyBookLayout page={<MyBookReadingPage />} />} />
        <Route path="finish" element={<MyBookLayout page={<MyBookFinishPage />} />} />
        <Route path="like" element={<MyBookLayout page={<MyBookLikePage />} />} />
      </Route>

      <Route path="/books" element={<PageLayout page={<BookSuggestionPage />} />} />
      <Route path="/books/:bookId" element={<PageLayout page={<BookDetailPage />} />} />
      <Route path="/memo/:memoId" element={<PageLayout page={<MemoPage />} />} />
      <Route path="/report/:bookReportId" element={<PageLayout page={<ReportPage />} />} />
      <Route path="/reading/:myBookId" element={<PageLayout page={<ReadingBookDetailPage />} />} />
      <Route path="/search" element={<PageLayout page={<SearchPage />} />} />
      <Route path="/barcode" element={<PageLayout page={<BarcodePage />} />} />
      <Route path="/mypage" element={<PageLayout page={<MyPage />} />} />

      <Route path="/privacy-policy" element={<PageLayout page={<PrivacyPolicyPage />} />} />
    </Routes>
  );
};

export default AppRoutes;
