export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface UserProfile {
  id: string;
  full_name: string;
  gender: string;
  user: string;
}

// Form Types
export type RegisterFormState = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

// Services

export type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email_or_username: string;
  password: string;
};

// Contexts
export type AuthData = {
  token?: string;
  username?: string;
};

export type AuthContextType = {
  authData: AuthData;
  isAuth: boolean;
  userLogin: (authData: AuthData) => void;
  userLogout: () => void;
};

export type ProfileData = {
  id: string;
  full_name: string;
  gender: string;
  user: string;
};

export type ProfileContextType = {
  profileData: ProfileData;
};

// Exercises
export type ExerciseSet = {
  weight: number;
  reps: number;
  minReps: number;
  maxReps: number;
};

export type ExerciseSearch = {
  id: string | number;
  name: string;
  cover_photo: string;
  information: string;
  video_tutorial: string;
  tips: string;
  created_at: string;
};
export type ExerciseSearchResponse = {
  exercises_by_user: ExerciseSearch[];
  exercises: ExerciseSearch[];
};
