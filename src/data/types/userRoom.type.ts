export interface IUserRoomCreate {
  roomId: string;
}
export interface IUserRoomUpdate extends IUserRoomCreate {
  isOnline: boolean;
}

export interface IUserRoomResponse extends IUserRoomUpdate {
  userId: string;
}
