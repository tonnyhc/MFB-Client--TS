import { ReactNode } from "react";
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthContextType, AuthData } from "../ts/types";




type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useLocalStorage<AuthData>("userData", {});

  function userLogin(authData: AuthData): void {
    setAuthData(authData);
  }

  function userLogout(): void {
    setAuthData({});
  }

  const context = {
    authData,
    isAuth: authData.token ? true : false,
    userLogin,
    userLogout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
