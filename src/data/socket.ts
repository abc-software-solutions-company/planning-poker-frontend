import {io} from 'socket.io-client';

import {IToastItem} from '@/core-ui/toast/toast';

interface IsocketToast extends IToastItem {
  lifeTime?: number;
}

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333', {
  autoConnect: false,
  transports: ['websocket']
});

export const socketUpdateRoom = () => {
  socket.emit('UpdateRoom');
};

export const socketJoinRoom = () => {
  socket.emit('JoinRoom');
};

export const socketToast = (data: IsocketToast) => {
  socket.emit('Toast', data);
};
export default socket;
