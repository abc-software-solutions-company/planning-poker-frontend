import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';
import {IUserStoryRespone} from './userStory.client';

//type
export interface ICompleteStory {
  id: string;
}

export interface ICreateStory {
  name: string;
  roomId: string;
}

export interface IUpdateStory extends ICompleteStory {
  name: string;
}

export interface IStoryResponse extends IBaseResponse, ICreateStory, ICompleteStory {
  avgPoint: number | null;
  userStories: IUserStoryRespone[];
}

//function
export function createStory(data: ICreateStory) {
  return api.post<IStoryResponse>(API_ENDPOINTS.STORY, data);
}

export function updateStory(data: IUpdateStory) {
  return api.patch<IStoryResponse>(API_ENDPOINTS.STORY, data);
}

export function completeStory(data: ICompleteStory) {
  return api.patch<IStoryResponse>(API_ENDPOINTS.STORY + '/complete', data);
}
