import { MouseEventHandler, ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavigationPillProps {
  onClick: MouseEventHandler<HTMLAnchorElement>;
  pathTo: string;
  activeIcon: ReactNode;
  icon: ReactNode;
  text: string;
}

const NavigationPill: React.FC<NavigationPillProps> = ({
  onClick,
  pathTo,
  activeIcon,
  icon,
  text,
}) => {
  const location = useLocation();
  const isActiveLink: boolean = location.pathname === pathTo;

  const textColor = isActiveLink ? "text-white" : "";

  return (
    <li>
      <NavLink
        className="text-nav-pils-color flex justify-center items-center flex-col w-16"
        onClick={onClick}
        to={pathTo}
      >
        <span className="text-2xl">{isActiveLink ? activeIcon : icon}</span>
        <span className={`text-sm ${textColor}`}>{text}</span>
      </NavLink>
    </li>
  );
};

export default NavigationPill;
