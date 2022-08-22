import {ICreateRoom} from '@/types';

import http from '../http';

export function createRoom(data: ICreateRoom) {
  http.rooms.post(data);
}
