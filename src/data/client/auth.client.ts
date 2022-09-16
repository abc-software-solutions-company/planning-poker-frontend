import {API_ENDPOINTS} from '@/configs/endpoint.config';

import api from '../http';

//type
export interface IAuthLogin {
  name: string;
}
export interface IAuthResponse {
  accessToken: string;
  user: {id: string; name: string};
}
//function
export function login(data: IAuthLogin) {
  return api.post<IAuthResponse>(API_ENDPOINTS.AUTH + '/login', data);
}
