import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';

//type
export interface IUserStoryCreate {
  storyId: string;
}

export interface IUserStoryUpdate extends IUserStoryCreate {
  votePoint: number | null;
}

export interface IUserStoryResponse extends IBaseResponse, IUserStoryUpdate {
  userId: string;
}

//function

export function createUserStory(data: IUserStoryCreate) {
  return api.post<IUserStoryResponse>(API_ENDPOINTS.USERSTORY, data);
}
export function updateUserStory(data: IUserStoryUpdate) {
  return api.patch<IUserStoryResponse>(API_ENDPOINTS.USERSTORY, data);
}
