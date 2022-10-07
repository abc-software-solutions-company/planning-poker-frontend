export interface IAuthLogin {
  name: string;
}
export type IAuthUpdate = IAuthLogin;

export interface IAuthInfor extends IAuthLogin {
  id: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IAuthInfor;
}
