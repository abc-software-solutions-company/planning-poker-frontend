export interface IPropsBase {
  className?: string;
  theme?: 'dark' | 'light';
}

export interface IAnyObj {
  [k: string]: any;
}

export interface IQueryOptions {
  page: number;
  pageSize: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface IBastAttributes {
  created_at: string;
  updated_at: string;
}

export interface IUser extends IBastAttributes {
  id: string;
  name: string;
  isHost: boolean;
}

export interface ICreateUser {
  name: string;
  isHost?: boolean;
}

export interface IpropsSVG {
  className?: string;
  fill?: string;
  width?: number;
}
export interface IVoteUser {
  name: string;
  host?: boolean;
  vote?: boolean;
}
