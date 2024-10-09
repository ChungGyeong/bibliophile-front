import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navs = [
    {
      name: "나의 책장",
      icon: "fi fi-tr-story-book text-gray",
      activeIcon: "fi fi-sr-story-book",
      route: "/mybook/reading",
    },
    {
      name: "추천 책",
      icon: "fi fi-rr-books text-gray",
      activeIcon: "fi fi-br-books",
      route: "/books",
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

  const handleNavClick = (route: string) => {
    navigate(route);
  };

  const getActive = () => {
    if (location.pathname.startsWith("/books")) {
      return "추천 책";
    } else if (
      location.pathname.startsWith("/reading") ||
      location.pathname.startsWith("/mybook")
    ) {
      return "나의 책장";
    } else if (location.pathname.startsWith("/search")) {
      return "검색";
    } else if (location.pathname.startsWith("/mypage")) {
      return "프로필";
    }
    return "홈";
  };

  return (
    <div className="fixed max-w-[600px] min-w-[320px] m-auto w-full bottom-0 h-[60px] bg-white shadow-navbar flex z-30">
      {navs.map(nav => (
        <button
          key={nav.name}
          onClick={() => handleNavClick(nav.route)}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <i className={`text-xl ${getActive() === nav.name ? nav.activeIcon : nav.icon}`} />
          <span
            className={`text-[10px] leading-none ${getActive() === nav.name ? "" : "text-gray"}`}
          >
            {nav.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default NavBar;
