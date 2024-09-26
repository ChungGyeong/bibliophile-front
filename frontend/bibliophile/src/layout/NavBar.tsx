import React from "react";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeNav, onNavChange }) => {
  const navigate = useNavigate();

  const navs = [
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
      route: "/search",
    },
    {
      name: "프로필",
      icon: "fi fi-rr-user text-gray",
      activeIcon: "fi fi-sr-user",
      route: "/mypage",
    },
  ];

  const handleNavClick = (nav: string, route: string) => {
    onNavChange(nav);
    navigate(route);
  };

  return (
    <div className="fixed max-w-[600px] min-w-[320px] m-auto w-full bottom-0 h-[60px] bg-white shadow-navbar flex z-30">
      {navs.map(nav => (
        <button
          key={nav.name}
          onClick={() => handleNavClick(nav.name, nav.route)}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <i className={`text-xl ${activeNav === nav.name ? nav.activeIcon : nav.icon}`} />
          <span className={`text-[10px] leading-none ${activeNav === nav.name ? "" : "text-gray"}`}>
            {nav.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default NavBar;
