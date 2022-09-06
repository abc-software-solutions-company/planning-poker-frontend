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
interface IBaseResponse {
  createdAt: string;
  updatedAt: string;
}

//User
export interface ICreateUser {
  name: string;
}
export interface IGetUser {
  id: string;
}
export interface IUserResponse extends IBaseResponse, ICreateUser, IGetUser {}

//Room
export interface ICreateRoom {
  name: string;
  hostUserId: string;
}
export interface IGetRoom {
  id: number;
}
export interface IRoomResponse extends IBaseResponse, ICreateRoom, IGetRoom {
  atc?: IAtcResponse[];
  stories?: IStoryResponse[];
}

//Story
export interface ICreateStory {
  name: string;
  roomId: number;
}
export interface IUpdateStory {
  name?: string;
  avgPoint?: number | null;
}
export interface IStoryResponse extends IBaseResponse, ICreateStory {
  id: string;
  avgPoint: number | null;
}

//Act
export interface ICreateAtc {
  userId: string;
  roomId: number;
}
export interface IUpdateAtc extends ICreateAtc {
  isOnline?: boolean;
  votePoint?: number | null;
}

export interface IAtcResponse extends IBaseResponse, ICreateAtc {
  isOnline: boolean;
  votePoint: number;
}

//Result
export interface ICreateResult {
  userId: string;
  storyId: string;
  votePoint: string;
}
export interface IResultRespone extends IBaseResponse, ICreateResult {}
