import { MouseEventHandler, ReactNode } from "react";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

const buttonClassNamesFromShape = {
  rectangular: "py-2.5 px-4 rounded-lg",
  circle: "w-9 h-9 rounded-full",
};

const buttonClassNamesFromType = {
  delete: "text-red-600",
  default: "text-white",
};

const buttonClassNamesFromWidth = {
  full: "w-full",
  unset: "unset",
};

function getButtonClassNamesFromColor(color: string): string {
  return `bg-button-${color}`;
}

interface ButtonProps {
  text?: string;
  color: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  id?: string;
  icon?: ReactNode;
  reverseOrder?: boolean;
  shape: "rectangular" | "circle";
  type: "delete" | "default";
  width: "full" | "unset";
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  onClick,
  id,
  icon,
  reverseOrder,
  shape,
  type,
  width,
  disabled,
  isLoading,
}) => {
  const shapeClassNames = buttonClassNamesFromShape[shape];
  const typeClassNames = buttonClassNamesFromType[type];
  const widthClassNames = buttonClassNamesFromWidth[width];
  const colorClassNames = getButtonClassNamesFromColor(color);
  const disabledClassNames = disabled ? "opacity-60" : "";
  const hoverClassNames = disabled
    ? ""
    : "transform transition-transform duration-100 hover:scale-110";


  return (
    <button
      id={id}
      disabled={disabled ? true : false}
      onClick={onClick}
      className={`flex justify-center gap-1 items-center ${hoverClassNames} ${colorClassNames} ${disabledClassNames} ${shapeClassNames} ${typeClassNames} ${widthClassNames}`}
    >
      {reverseOrder ? (
        <>
          {isLoading && <div><LoadingSpinner /></div>}
          {icon && <p>{icon}</p>}
          <p>{text}</p>
        </>
      ) : (
        <>
          {isLoading && <div><LoadingSpinner /></div>}
          <p>{text}</p>
          {icon && <p>{icon}</p>}
        </>
      )}
    </button>
  );
};

export default Button;
