import React, { useState } from "react";
import MyBookTab from "./MyBookTab";

interface MyBookLayoutProps {
  page?: React.ReactNode;
}

const MyBookLayout: React.FC<MyBookLayoutProps> = ({ page }) => {
  const [activeTab, setActiveTab] = useState("읽는 중");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`활성화된 탭: ${tab}`);
  };

  return (
    <React.Fragment>
      <MyBookTab activeTab={activeTab} onChange={handleTabChange} />
      <main className="w-[90%] m-auto">{page}</main>
    </React.Fragment>
  );
};

export default MyBookLayout;
