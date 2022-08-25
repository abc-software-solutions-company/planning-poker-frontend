import {ICreateUser} from '@/types';

import http from '../http';

export function createUser(data: ICreateUser) {
  return http.users.post(data);
}
export function getUser(id: string) {
  return http.users.get(id);
}
