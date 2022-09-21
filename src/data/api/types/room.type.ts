export interface IStory {
  id: string;
  name: string;
  avgPoint: number;
}

export interface IUser {
  id: string;
  name: string;
  isOnline: boolean;
  votePoint?: number | null;
}

export interface IRoomGet {
  id: string;
}

export interface IRoomCreate {
  name: string;
}
export interface IRoomResponse extends IRoomCreate, IRoomGet {
  hostUserId: string;
}

export interface IRoomFullResponse extends IRoomResponse {
  story?: IStory;
  users: IUser[];
}
