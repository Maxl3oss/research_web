export interface UserInfo {
	id: string;
	email: string;
	profile?: string | null;
	first_name: string;
	last_name: string;
	status: number;
	role_id: number;
	prefix: string;
}

export interface SignInUserArgs {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  user: UserInfo | null;
  isLoading: boolean;
	role: number | null;
}
