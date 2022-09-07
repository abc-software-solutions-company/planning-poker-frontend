import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import API from '../API';

//type
export interface IAllByStoryResult {
  storyId: string;
}
export interface IGetResult extends IAllByStoryResult {
  userId: string;
}

export interface ICreateResult extends IGetResult {
  votePoint: number | null;
}
export type IUpdateResult = ICreateResult;

export interface IResultRespone extends IBaseResponse, ICreateResult {}

//function
export function getResult({userId, storyId}: IGetResult) {
  return API.get<IResultRespone>(`${API_ENDPOINTS.RESULT}/${userId}/${storyId}`);
}
export function allResultByStory({storyId}: IAllByStoryResult) {
  return API.get<IResultRespone[]>(`${API_ENDPOINTS.RESULT}/${storyId}`);
}
export function createResult(data: ICreateResult) {
  return API.post<IResultRespone>(API_ENDPOINTS.RESULT, data);
}
export function updateResult(data: IUpdateResult) {
  return API.patch<IResultRespone>(API_ENDPOINTS.RESULT, data);
}
