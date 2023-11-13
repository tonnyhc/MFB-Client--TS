import { LoginBody, RegisterBody } from "../ts/types";
import { post } from "./requester";

export async function registerRequest(body: RegisterBody): Promise<any>{
    const registerURL = 'authentication/register/';
    try {
        const data = await post(registerURL, body);
        return data;
    } catch(error){
        throw error;
    }
}


export async function loginRequest(body: LoginBody): Promise<any>{
    const loginURL = 'authentication/login/';
    try{
        const data = await post(loginURL, body);
        return data;
    } catch(error){
        throw error;
    }
}