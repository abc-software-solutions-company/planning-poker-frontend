import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../api';

//type
export interface IAllByStoryUserStory {
  storyId: string;
}
export interface IGetUserStory extends IAllByStoryUserStory {
  userId: string;
}

export interface ICreateUserStory extends IGetUserStory {
  votePoint: number | null;
}

export type IUpdateUserStory = ICreateUserStory;

export interface IUserStoryRespone extends IBaseResponse, ICreateUserStory {}

//function

export function createUserStory(data: ICreateUserStory) {
  return api.post<IUserStoryRespone>(API_ENDPOINTS.USERSTORY, data);
}
export function updateUserStory(data: IUpdateUserStory) {
  return api.patch<IUserStoryRespone>(API_ENDPOINTS.USERSTORY, data);
}
