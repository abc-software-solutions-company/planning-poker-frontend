import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {ICreateUser, IGetUser, IUserResponse} from '@/types';

import API from '../API';

export function createUser(data: ICreateUser) {
  return API.post<IUserResponse>(API_ENDPOINTS.USER, data);
}
export function getUser({id}: IGetUser) {
  return API.get<IUserResponse>(`${API_ENDPOINTS.USER}/${id}`);
}
