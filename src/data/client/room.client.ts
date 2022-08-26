import {ROUTES} from '@/configs/routes.config';
import {ICreateRoom, IGetUSR} from '@/types';

import http from '../http';

export function createRoom(data: ICreateRoom) {
  return http.rooms.post(data);
}

export function findRoom(idOrLink: string) {
  if (!idOrLink.includes('/')) {
    if (Number(idOrLink)) return http.rooms.get(idOrLink);
    return null;
  } else {
    const arr = idOrLink.split(ROUTES.ROOM);
    const id = arr[arr.length - 1];
    if (Number(id)) return http.rooms.get(id);
    return null;
  }
}

export function checkHost(data: IGetUSR) {
  try {
    return http.usr.get(data);
  } catch {
    return null;
  }
}
