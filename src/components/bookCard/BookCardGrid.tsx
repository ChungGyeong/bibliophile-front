import React from "react";

interface BookCardGridProps {
  children: React.ReactNode;
}

const BookCardGrid: React.FC<BookCardGridProps> = ({ children }) => {
  return <div className="grid grid-cols-2 gap-x-[5%] gap-y-[20px] w-full">{children}</div>;
};

export default BookCardGrid;
