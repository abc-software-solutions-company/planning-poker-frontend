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
}

export interface IRoom extends IBastAttributes {
  id: number;
  name: string;
}

export interface IStory extends IBastAttributes {
  id: string;
  name: string;
}

export interface ICreateUser {
  name: string;
  isHost?: boolean;
}

export interface ICreateRoom {
  name: string;
}

export interface ICreateStory {
  name: string;
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

export interface IUSR extends IBastAttributes {
  userId: string;
  storyId: string;
  roomId: number;
  isOnline: boolean;
  isHost: boolean;
  storyPoint: number;
}
export interface IGetUSR {
  userId: string;
  storyId?: string;
  roomId: number;
}
