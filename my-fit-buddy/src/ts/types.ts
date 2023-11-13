export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";



// Form Types
export type RegisterFormState = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
  };



// Types for requests

export type RegisterBody = {
    username: string,
    email: string,
    password: string
}

export type LoginBody = {
    username_or_email: string,
    password: string
}
