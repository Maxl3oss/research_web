export interface ILogin {
  email: string;
  password: string;
}

export type IRegister = ILogin & {
  prefix: string,
  first_name: string,
  last_name: string,
}

export interface IReqResearch {
  title: string,
  title_alternative: string,
  creator: string,
  subject: string,
  description: string,
  publisher: string,
  contributor: string,
  source: string,
  rights: string,
  year_creation: string,
  pdf: unknown | FileList,
  pdf_name?: string,
  file_name?: string,
  image: string | File,
  user_id: string,
  tags_id: string,
  tags_name: string,
}

export interface IReqUser {
  id?: string,
  prefixName: string,
  prefix: string,
  first_name: string,
  last_name: string,
  email: string,
  password?: string,
  confirmPassword?: string,
  profile?: string | File,
  isChangePassword?: boolean,
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const FILE_SIZE = 5000000; // 5MB in bytes
export const SUPPORTED_FORMATS = {
  pdf: ['application/pdf'],
  image: ['image/jpeg', 'image/png']
};