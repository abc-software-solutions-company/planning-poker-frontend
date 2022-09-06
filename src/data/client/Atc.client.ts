import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {ICreateAtc, IUpdateAtc} from '@/types';

import API from '../API';

export function createAtc(data: ICreateAtc) {
  return API.post(API_ENDPOINTS.ATC, data);
}

export function updateAtc(data: IUpdateAtc) {
  return API.patch(API_ENDPOINTS.ATC, data);
}
