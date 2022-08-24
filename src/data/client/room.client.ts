import {ICreateRoom} from '@/types';

import http from '../http';

export function createRoom(data: ICreateRoom) {
  return http.rooms.post(data);
}
