import React, { useState } from "react";
import MyBookTab from "./MyBookTab";
import NavBar from "./NavBar.tsx";

interface MyBookLayoutProps {
  page?: React.ReactNode;
}

const MyBookLayout: React.FC<MyBookLayoutProps> = ({ page }) => {
  const [activeTab, setActiveTab] = useState("읽는 중");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`활성화된 탭: ${tab}`);
  };

  const [activeNav, setActiveNav] = useState("홈");
  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
  };

  return (
    <React.Fragment>
      <MyBookTab activeTab={activeTab} onChange={handleTabChange} />
      <main className="w-[90%] m-auto">{page}</main>
      <NavBar activeNav={activeNav} onNavChange={handleNavChange} />
    </React.Fragment>
  );
};

export default MyBookLayout;
