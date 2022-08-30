import {ROUTES} from '@/configs/routes.config';
import {ICreateRoom, ICreateUSR, IGetUSR, IUpdateUSR} from '@/types';

import http from '../http';

export function createRoom(data: ICreateRoom) {
  return http.rooms.post(data);
}

export function findRoom(idOrLink: string) {
  if (!idOrLink.includes('/')) {
    if (Number(idOrLink)) return http.rooms.get(idOrLink);
    return null;
  } else {
    const arr = idOrLink.split(window.location.origin + ROUTES.ROOM);
    const id = arr[arr.length - 1];
    if (Number(id)) return http.rooms.get(id);
    return null;
  }
}
export function createUSR(data: ICreateUSR) {
  return http.usrs.post(data);
}
export function updateUSR(data: IUpdateUSR) {
  return http.usrs.patch(data);
}
export function getUSR(data: IGetUSR) {
  return http.usrs.get(data);
}
export function getUSRsbyRoom(data: IGetUSR) {
  return http.usrs.allbyRoom(data);
}
