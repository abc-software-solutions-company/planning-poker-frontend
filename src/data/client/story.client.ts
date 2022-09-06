import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import API from '../API';

//type
export interface ICompleteStory {
  id: string;
}

export interface ICreateStory {
  name: string;
  roomId: number;
}

export interface IUpdateStory {
  name?: string;
  avgPoint?: number | null;
}

export interface IStoryResponse extends IBaseResponse, ICreateStory, ICompleteStory {
  avgPoint: number | null;
}

//function
export function createStory(data: ICreateStory) {
  return API.post<IStoryResponse>(API_ENDPOINTS.STORY, data);
}
export function updateStory(data: IUpdateStory) {
  return API.patch<IStoryResponse>(API_ENDPOINTS.STORY, data);
}
export function completeStory(data: ICompleteStory) {
  return API.patch<IStoryResponse>(API_ENDPOINTS.STORY, data);
}
