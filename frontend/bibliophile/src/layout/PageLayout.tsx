import React from "react";
import BottomNavigationBar from "./BottomNavigationBar.tsx";

interface PageLayoutProps {
  page?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ page }) => {
  return (
    <React.Fragment>
      <main className="w-[90%] m-auto">{page}</main>
      <BottomNavigationBar />
    </React.Fragment>
  );
};

export default PageLayout;
