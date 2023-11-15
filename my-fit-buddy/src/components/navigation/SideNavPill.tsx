import { ReactNode, MouseEvent } from "react";
import { Link } from "react-router-dom";

interface SideNavPill {
  icon: ReactNode;
  text: string;
  path: string;
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
}

const SideNavPill: React.FC<SideNavPill> = ({ icon, text, path, onClick }) => {
  return (
    <li onClick={onClick} className="mb-2">
      <Link
        to={path}
        className="flex items-center gap-2 font text-lg tracking-wider"
      >
        <p className="text-red-500 text-[22px]">{icon}</p>
        <p>{text}</p>
      </Link>
    </li>
  );
};

export default SideNavPill;
