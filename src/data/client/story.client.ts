import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';
import {IUserStoryResponse} from './userStory.client';

//type
export interface IStoryComplete {
  id: string;
}

export interface IStoryCreate {
  name: string;
  roomId: string;
}

export interface IStoryUpdate extends IStoryComplete {
  name: string;
}

export interface IStoryResponse extends IBaseResponse, IStoryCreate, IStoryComplete {
  avgPoint: number | null;
  userStories: IUserStoryResponse[];
}

//function
export function createStory(data: IStoryCreate) {
  return api.post<IStoryResponse>(API_ENDPOINTS.STORY, data);
}

export function updateStory(data: IStoryUpdate) {
  return api.patch<IStoryResponse>(API_ENDPOINTS.STORY, data);
}

export function completeStory(data: IStoryComplete) {
  return api.patch<IStoryResponse>(API_ENDPOINTS.STORY + '/complete', data);
}
