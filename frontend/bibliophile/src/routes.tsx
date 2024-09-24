import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import PageLayout from "./layout/PageLayout.tsx";
import DefaultLayout from "./layout/DefaultLayout.tsx";
import MyBookLayout from "./layout/MyBookLayout.tsx";
import MyBookReadingPage from "./pages/MyBookReadingPage.tsx";
import MyBookFinishPage from "./pages/MyBookFinishPage.tsx";
import MyBookLikePage from "./pages/MyBookLikePage.tsx";
import BookDetailPage from "./pages/BookDetailPage.tsx";
import MemoPage from "./pages/MemoPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<DefaultLayout page={<LoginPage />} />} />
      <Route path="/" element={<PageLayout page={<HomePage />} />} />
      {/* <Route path="/mybook" element={<MyBookLayout page={<MyBookPage />} />} /> */}
      <Route path="/mybook/reading" element={<MyBookLayout page={<MyBookReadingPage />} />} />
      <Route path="/mybook/finish" element={<MyBookLayout page={<MyBookFinishPage />} />} />
      <Route path="/mybook/like" element={<MyBookLayout page={<MyBookLikePage />} />} />
      <Route path="/books/:bookId" element={<PageLayout page={<BookDetailPage />} />} />
      <Route path="/memo/:memoId" element={<PageLayout page={<MemoPage />} />} />
    </Routes>
  );
};

export default AppRoutes;
