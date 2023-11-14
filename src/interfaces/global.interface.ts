export interface ILogin {
  email: string;
  password: string;
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
  image: string | File,
  user_id: string,
  tags_id: string,
  tags_name: string,
}

export interface IReqUser {
  prefixName: string,
  prefix: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  confirmPassword: string,
  profile: string | File,
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];