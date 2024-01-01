import { DateType } from "react-tailwindcss-datepicker";
import { IPagin } from "./pagin.interface";

export interface IResearch {
  id: number;
  contributor: string;
  creator: string;
  date: string;
  description: string;
  file_url: string | File;
  file_name: string;
  image_url: string | File;
  isVerified: number;
  publisher: string;
  rights: string;
  source: string;
  subject: string;
  title: string;
  created_date: string;
  title_alternative: string;
  year_creation: string | DateType;
  user_name: string;
  views: number;
  average_rating: number;
  user_info: IUserInfo;
  tags_info: ITagsInfo;
  tags_id: number;
  rating_id: number;
  like: boolean;
  likes: number;
}

export interface ITagsInfo {
  id: number;
  name: string;
}

export interface IResponse<T = []> {
  statusCode: number;
  taskStatus: boolean;
  message: string;
  data: T;
  pagin: IPagin;
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