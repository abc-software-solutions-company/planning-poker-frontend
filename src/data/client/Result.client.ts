import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import API from '../API';

//type

export interface IGetResult {
  userId: string;
  storyId: string;
}

export interface ICreateResult extends IGetResult {
  votePoint: number;
}
export type IUpdateResult = ICreateResult;

export interface IResultRespone extends IBaseResponse, ICreateResult {}

//function
export function getResult({userId, storyId}: IGetResult) {
  return API.get<IResultRespone>(`${API_ENDPOINTS.RESULT}/${userId}/${storyId}`);
}
export function createResult(data: ICreateResult) {
  return API.post<IResultRespone>(API_ENDPOINTS.RESULT, data);
}
export function updateResult(data: IUpdateResult) {
  return API.patch<IResultRespone>(API_ENDPOINTS.RESULT, data);
}
