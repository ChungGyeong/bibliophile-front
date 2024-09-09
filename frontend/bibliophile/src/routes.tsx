import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import PageLayout from "./layout/PageLayout.tsx";
import DefaultLayout from "./layout/DefaultLayout.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/*<Route path="/login" element={<DefaultLayout page={<LoginPage />}/>} />*/}
      <Route path="/" element={<PageLayout page={<HomePage />} />} />
    </Routes>
  );
};

export default AppRoutes;
