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
export interface IBaseResponse {
  createdAt: string;
  updatedAt: string;
}

//Socket
export interface ISocketUpdate {
  roomId: number;
}
