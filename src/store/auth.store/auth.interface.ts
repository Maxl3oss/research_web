export interface UserInfo {
  user_id: number;
  user_fname: string;
  user_lname: string;
  user_email: string;
  role_id: number;
  isVerified: number;
}

export interface SignInUserArgs {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  user: UserInfo | null;
  isLoading: boolean;
  error: string | null;
}

