import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { userProfileRequest } from "../services/profileServices";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

type ProfileData = {
    id: string,
    full_name: string,
    gender: string,
    user: string
}

type ProfileContext = {
    profileData: ProfileData
}

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileContext = createContext<ProfileContext>({} as ProfileContext);

const defaultProfileData: ProfileData = {
  id: "",
  full_name: "",
  gender: "",
  user: "",
};

const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => { 
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
  const {isAuth} = useContext(AuthContext);

  useEffect(() => {
    async function fetchProfileData() {
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