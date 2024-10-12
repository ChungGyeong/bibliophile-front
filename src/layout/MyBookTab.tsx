import React from "react";

interface MyBookTabProps {
  onChange: (activeTab: string) => void;
  activeTab: string;
}

const MyBookTab: React.FC<MyBookTabProps> = ({ onChange, activeTab }) => {
  const tabs = ["읽는 중", "완독한 책", "찜한 책"];

  const handleTabClick = (tab: string) => {
    onChange(tab);
  };

  return (
    <div className="w-full flex justify-between border-b border-soft-gray">
      {tabs.map(tab => (
        <div key={tab} className="relative flex-1 text-center">
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`text-sm py-[10px] ${activeTab === tab ? "font-medium" : "font-light"}`}
          >
            {tab}
          </button>
          {activeTab === tab && (
            <div className="absolute left-0 w-full h-[3px] bg-orange" style={{ bottom: "-2px" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBookTab;
