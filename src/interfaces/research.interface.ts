export interface IResearch {
  contributor: string;
  creator: string;
  date: string;
  description: string;
  file_url: number;
  id: number;
  image_url: string;
  isVerified: number;
  publisher: string;
  rights: string;
  source: string;
  subject: string;
  title: string;
  title_alternative: string;
  user_name: string
  user_info: IUserInfo
}

export interface IUserInfo {
  prefix: string;
  first_name: string;
  last_name: string;
  profile: string
}