import {ICreateUser} from '@/types';

import http from '../http';

export function createUser(data: ICreateUser) {
  http.users.post(data);
}
