import {ICreateUser} from '@/types';

import http from '../http';

export function createUser(data: ICreateUser) {
  return http.users.post(data);
}
