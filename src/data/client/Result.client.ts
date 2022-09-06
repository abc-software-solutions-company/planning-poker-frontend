import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {ICreateResult} from '@/types';

import API from '../API';

export function createResult(data: ICreateResult) {
  return API.post(API_ENDPOINTS.RESULT, data);
}
