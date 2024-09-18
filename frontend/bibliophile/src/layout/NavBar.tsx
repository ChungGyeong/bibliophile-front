import React from "react";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const tabs = [
    {
      name: "나의 책장",
      icon: "fi fi-tr-story-book text-gray",
      activeIcon: "fi fi-sr-story-book",
      route: "/",
    },
    {
      name: "추천 책",
      icon: "fi fi-rr-books text-gray",
      activeIcon: "fi fi-br-books",
      route: "/",
    },
    {
      name: "홈",
      icon: "fi fi-rr-paw text-gray",
      activeIcon: "fi fi-sr-paw",
      route: "/",
    },
    {
      name: "검색",
      icon: "fi fi-rr-search text-gray",
      activeIcon: "fi fi-sr-search",
      route: "/",
    },
    {
      name: "프로필",
      icon: "fi fi-rr-user text-gray",
      activeIcon: "fi fi-sr-user",
      route: "/",
    },
  ];

  const handleTabClick = (tab: string, route: string) => {
    onTabChange(tab);
    navigate(route);
  };

  return (
    <div className="fixed w-full bottom-0 h-[60px] bg-white shadow-navbar flex">
      {tabs.map(tab => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name, tab.route)}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <i className={`text-xl ${activeTab === tab.name ? tab.activeIcon : tab.icon}`} />
          <span className={`text-[10px] leading-none ${activeTab === tab.name ? "" : "text-gray"}`}>
            {tab.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default NavBar;
