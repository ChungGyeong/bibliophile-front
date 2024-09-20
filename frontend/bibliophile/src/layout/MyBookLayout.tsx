import React, { useState } from "react";
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

  const [activeNav, setActiveNav] = useState("나의 책장");
  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
  };

  return (
    <React.Fragment>
      <MyBookTab activeTab={currentTab()} onChange={handleTabChange} />
      <main className="w-[90%] m-auto">{page}</main>
      <NavBar activeNav={activeNav} onNavChange={handleNavChange} />
    </React.Fragment>
  );
};

export default MyBookLayout;
