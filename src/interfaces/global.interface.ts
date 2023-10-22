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
  pdf: string | File | FileList,
  image: string | File,
  user_id: string,
  tags_id: number,
  tags_name: string,
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];