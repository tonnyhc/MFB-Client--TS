import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { userProfileRequest } from "../services/profileServices";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType, ProfileContextType, ProfileData } from "../ts/types";


interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);

const defaultProfileData: ProfileData = {
  id: "",
  full_name: "",
  gender: "",
  user: "",
};

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => { 
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
  const {isAuth} = useContext<AuthContextType>(AuthContext);
    
  useEffect(() => {
    async function fetchProfileData():Promise<any> {
      try {
        const data = await userProfileRequest();
        setProfileData(data);
        return data;
      } catch (error) {
        alert(error);
      }
    };
    if (isAuth){
      fetchProfileData();
      return
    }

  }, [isAuth]);

  const context = {
    profileData,
  };

  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;