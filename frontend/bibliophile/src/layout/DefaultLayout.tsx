import React from "react";

interface DefaultLayoutProps {
  page?: React.ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ page }) => {
  return (
    <main className="max-w-[600px] min-w-[320px] m-auto">
      <div className="w-[90%] m-auto">{page}</div>
    </main>
  );
};

export default DefaultLayout;
