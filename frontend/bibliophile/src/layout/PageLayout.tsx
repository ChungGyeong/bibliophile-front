import React, { useState } from "react";
import NavBar from "./NavBar.tsx";

interface PageLayoutProps {
  page?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ page }) => {
  const [activeNav, setActiveNav] = useState("홈");
  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
  };

  return (
    <main className="max-w-[600px] min-w-[320px] m-auto">
      <div className="w-[90%] m-auto mb-[100px]">{page}</div>
      <NavBar activeNav={activeNav} onNavChange={handleNavChange} />
    </main>
  );
};

export default PageLayout;
