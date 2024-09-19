import React from "react";

interface DefaultLayoutProps {
  page?: React.ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ page }) => {
  return (
    <React.Fragment>
      <main className="w-[90%] m-auto">{page}</main>
    </React.Fragment>
  );
};

export default DefaultLayout;
