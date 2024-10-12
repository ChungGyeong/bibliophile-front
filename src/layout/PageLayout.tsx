import React from "react";
import NavBar from "./NavBar.tsx";

interface PageLayoutProps {
  page?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ page }) => {
  return (
    <main className="max-w-[600px] min-w-[320px] m-auto overflow-x-hidden">
      <div className="w-[90%] m-auto mb-[100px]">{page}</div>
      <NavBar />
    </main>
  );
};

export default PageLayout;
