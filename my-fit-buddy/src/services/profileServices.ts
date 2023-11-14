import { UserProfile } from "../ts/types";
import { get } from "./requester";

export async function userProfileRequest(): Promise<UserProfile>{
    const requestURL = 'profile/user-profile'
    try{
        const data = await get(requestURL);
        return data;
    } catch(error){
        throw error;
    }
}