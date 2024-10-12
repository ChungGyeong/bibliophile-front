import React from "react";
import MyBookTab from "./MyBookTab";
import NavBar from "./NavBar.tsx";
import { useNavigate, useLocation } from "react-router-dom";

interface MyBookLayoutProps {
  page?: React.ReactNode;
}

const MyBookLayout: React.FC<MyBookLayoutProps> = ({ page }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (tab: string) => {
    if (tab === "읽는 중") navigate("/mybook/reading");
    if (tab === "완독한 책") navigate("/mybook/finish");
    if (tab === "찜한 책") navigate("/mybook/like");
  };

  const currentTab = () => {
    if (location.pathname.includes("/reading")) return "읽는 중";
    if (location.pathname.includes("/finish")) return "완독한 책";
    if (location.pathname.includes("/like")) return "찜한 책";
    return "읽는 중";
  };

  return (
    <main className="max-w-[600px] min-w-[320px] m-auto">
      <MyBookTab activeTab={currentTab()} onChange={handleTabChange} />
      <div className="w-[90%] m-auto mb-[100px]">{page}</div>
      <NavBar />
    </main>
  );
};

export default MyBookLayout;
