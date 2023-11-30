import { ReactNode, createContext, useState } from "react";

type Toast = {
  isVisible: boolean;
  message: string;
  icon?: ReactNode;
};

type UtilityContextType = {
  toast: Toast;
  updateToastState: (
    isVisible: boolean,
    message: string,
    icon?: ReactNode
  ) => void;
  hideToast: () => void
};

export const UtilityContext = createContext<UtilityContextType>(
  {} as UtilityContextType
);

interface UtilityProviderProps {
  children: ReactNode;
}

export const UtilityProvider: React.FC<UtilityProviderProps> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast>({
    isVisible: false,
    message: "",
    icon: undefined,
  });
  const updateToastState = (
    isVisible: boolean,
    message: string,
    icon?: ReactNode
  ) => {
    setToast({
      isVisible,
      message,
      icon,
    });
  };

  const hideToast= () => {
    setToast({
        isVisible: false,
        message: "",
        icon: undefined
    });
  };
  const context: UtilityContextType = {
    toast,
    updateToastState,
    hideToast
  };

  return (
    <UtilityContext.Provider value={context}>
      {children}
    </UtilityContext.Provider>
  );
};
