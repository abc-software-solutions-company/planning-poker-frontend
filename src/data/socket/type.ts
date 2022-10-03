import {IToastItem} from '@/core-ui/toast/toast';

export const SOCKET_EVENTS = {
  reconnect: 'reconnect',
  updateRoom: 'UpdateRoom',
  updateRoomExceptMe: 'UpdateRoomExceptMe',
  joinRoom: 'JoinRoom',
  toast: 'Toast'
};

export interface IsocketToast extends IToastItem {
  lifeTime?: number;
}
