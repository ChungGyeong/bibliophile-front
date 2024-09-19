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
    <React.Fragment>
      <main className="w-[90%] m-auto">{page}</main>
      <NavBar activeNav={activeNav} onNavChange={handleNavChange} />
    </React.Fragment>
  );
};

export default PageLayout;
