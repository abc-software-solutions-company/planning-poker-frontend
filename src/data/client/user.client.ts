import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';
import {IUserStoryResponse} from './userStory.client';

//type

export interface IUserResponse extends IBaseResponse {
  id: string;
  name: string;
  userStories: IUserStoryResponse[];
}

//function
export function getUserInfor() {
  return api.get<IUserResponse>(API_ENDPOINTS.USER + '/infor');
}
