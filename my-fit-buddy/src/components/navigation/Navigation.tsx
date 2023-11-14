import { NavLink, useLocation } from "react-router-dom";
import { ReactNode, useRef, useState } from "react";

import { HiBars3 } from "react-icons/hi2";
import { PiBarbell, PiBarbellFill } from "react-icons/pi";
import { GoHomeFill, GoHome } from "react-icons/go";
import useClickOutside from "../../hooks/useClickOutside";
import { useContext } from "react";
import MoreSideNav from "./MoreSideNav";
import { ProfileContextType } from "../../ts/types";
import { ProfileContext } from "../../contexts/ProfileContext";

type NavItem = {
  path: string;
  activeIcon: ReactNode;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    path: "/",
    activeIcon: <GoHomeFill className="fill-white" />,
    icon: <GoHome className="text-nav-pills-collor" />,
  },
  {
    path: "/workouts",
    activeIcon: <PiBarbellFill className="fill-white" />,
    icon: <PiBarbell className="text-nav-pills-collor" />,
  },
];

interface NavigationProps {
  children: ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const location = useLocation();
  const isActiveLink = (path: string) => location.pathname === path;
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const { profileData } = useContext<ProfileContextType>(ProfileContext);

  function onMoreClick(e: React.MouseEvent) {
    setIsMoreClicked(true);
  }
  const closeSideNav = () => {
    setIsMoreClicked(false);
  };

  const moreSideNavRef = useRef(null);
  useClickOutside(moreSideNavRef, () => {
    closeSideNav();
  });

  return (
    <>
      {isMoreClicked && (
        <MoreSideNav closeNav={closeSideNav} ref={moreSideNavRef} />
      )}
      <div className="fixed z-10 w-full text-white px-2 top-0 pb-[6px]">
        <div className="flex flex-row justify-between text-4xl h-12 items-center">
          <div onClick={onMoreClick}>
            {<HiBars3 id="openMoreNavigation" style={{ color: "FFF" }} />}
          </div>
          <div className="py-2 text-center">
            <h2 className="text-base">Welcome Back {profileData.full_name}</h2>
            <p className="text-gray-500 text-sm">Sore today, Strong tomorrow</p>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/61/e8/19/61e81976-75db-abc5-8d77-5549d27de8b9/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
              alt=""
            />
          </div>
        </div>

        {/* <div>
          <h2 className="text-lg">Welcome Back {profileData.full_name}</h2>
          <p className="text-gray-500 text-sm">Sore today, Strong tomorrow</p>
        </div> */}
      </div>

      {children}

      <ul
        className="flex flex-row justify-between fixed z-10 w-full bottom-0 px-2 text-4xl h-12 items-center bg-nav-bg-dark"
        role="list"
      >
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              className="text-nav-pils-color"
              onClick={closeSideNav}
              to={item.path}
            >
              {isActiveLink(item.path) ? item.activeIcon : item.icon}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navigation;
