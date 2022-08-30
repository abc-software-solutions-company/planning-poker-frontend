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
export interface IpropsSVG {
  className?: string;
  fill?: string;
  width?: number;
}
export interface IVoteUser {
  name: string;
  host?: boolean;
  vote?: number;
}
interface IBastAttributes {
  created_at: string;
  updated_at: string;
}

export interface IUser extends IBastAttributes {
  id: string;
  name: string;
}
export interface ICreateUser {
  name: string;
  isHost?: boolean;
}
export interface IRoom extends IBastAttributes {
  id: number;
  name: string;
  hostUserId: string;
}
export interface ICreateRoom {
  name: string;
  hostUserId: string;
}

export interface IStory extends IBastAttributes {
  id: string;
  name: string;
  avgPoint: number | null;
}

export interface ICreateStory {
  name: string;
}
export interface IUpdateStory {
  name?: string;
  avgPoint?: number | null;
}
export interface IUSR extends IBastAttributes {
  userId: string;
  storyId: string;
  roomId: number;
  isOnline: boolean;
  storyPoint: number;
}
export interface IGetUSR {
  roomId: number;
}
export interface ICreateUSR extends IGetUSR {
  userId: string;
  storyId: string;
}
export interface IUpdateUSR extends ICreateUSR {
  isOnline?: boolean;
  isHost?: boolean;
  storyPoint?: number | null;
}
export interface IFullUSR extends IUSR {
  story: IStory;
  room: IRoom;
  user: IUser;
}
