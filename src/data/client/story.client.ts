import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {ICreateStory, IUpdateStory} from '@/types';

import API from '../API';

export function createStory(data: ICreateStory) {
  return API.post(API_ENDPOINTS.STORY, data);
}
export function updateStory(data: IUpdateStory) {
  return API.patch(API_ENDPOINTS.STORY, data);
}
