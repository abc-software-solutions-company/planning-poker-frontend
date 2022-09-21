export interface IAuthLogin {
  name: string;
}

export interface IAuthInfor {
  id: string;
  name: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IAuthInfor;
}
