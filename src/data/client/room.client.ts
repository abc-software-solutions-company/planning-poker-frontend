import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {ROUTES} from '@/configs/routes.config';
import {ICreateRoom, IGetRoom, IRoomResponse} from '@/types';

import API from '../API';

export function getRoom({id}: IGetRoom) {
  return API.get<IRoomResponse>(`${API_ENDPOINTS.ROOM}/${id}`);
}
export function allRoom() {
  return API.get<IRoomResponse[]>(API_ENDPOINTS.ROOM);
}
export function createRoom(data: ICreateRoom) {
  return API.post<IRoomResponse>(API_ENDPOINTS.ROOM, data);
}
export function findRoom(idOrLink: string) {
  if (!idOrLink.includes('/')) {
    if (Number(idOrLink)) return getRoom({id: Number(idOrLink)});
    return null;
  } else {
    const arr = idOrLink.split(window.location.origin + ROUTES.ROOM);
    const id = arr[arr.length - 1];
    if (Number(id)) return getRoom({id: Number(id)});
    return null;
  }
}
