import React, { useState } from "react";
import NavBar from "./NavBar.tsx";

interface PageLayoutProps {
  page?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ page }) => {
  const [activeTab, setActiveTab] = useState("홈");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <main className="w-[90%] m-auto">{page}</main>
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </React.Fragment>
  );
};

export default PageLayout;
