export interface IUser {
  id: string;
  prefix: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile: string | null;
  role_id: number;
  status: number;
}
