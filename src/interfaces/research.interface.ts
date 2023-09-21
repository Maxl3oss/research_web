export interface IResearch {
  id?: number;
  contributor?: string;
  creator?: string;
  date?: string;
  description?: string;
  file_url?: number;
  image_url?: string | File;
  isVerified?: number;
  publisher?: string;
  rights?: string;
  source?: string;
  subject?: string;
  title?: string;
  title_alternative?: string;
  user_name?: string
  user_info?: IUserInfo
}

export interface IResponse<T = []> {
  statusCode: number;
  taskStatus: boolean;
  message: string;
  data: T;
}

export interface IUserInfo {
  prefix: string;
  first_name: string;
  last_name: string;
  profile: string
}

export interface ISearch {
  search?: string;
  startData?: string;
  endDate?: string;
}