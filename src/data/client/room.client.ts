import {ROUTES} from '@/configs/routes.config';
import {ICreateRoom} from '@/types';

import http from '../http';

export function createRoom(data: ICreateRoom) {
  return http.rooms.post(data);
}
export function findRoom(idOrLink: string) {
  if (!idOrLink.includes('/')) return http.rooms.get(idOrLink);
  else {
    const arr = idOrLink.split(ROUTES.ROOM);
    const id = arr[arr.length - 1];
    return http.rooms.get(id);
  }
}
