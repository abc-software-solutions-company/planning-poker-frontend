import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';
import {IUserStoryRespone} from './userStory.client';

//type
export interface ICreateUser {
  name: string;
}

export interface IGetUser {
  id: string;
}

export interface IUserResponse extends IBaseResponse, ICreateUser, IGetUser {
  userStories: IUserStoryRespone[];
}

//function
export function getUser({id}: IGetUser) {
  return api.get<IUserResponse>(API_ENDPOINTS.USER + '/' + id);
}

export function createUser(data: ICreateUser) {
  return api.post<IUserResponse>(API_ENDPOINTS.USER, data);
}
