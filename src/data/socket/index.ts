import {io} from 'socket.io-client';

import {IsocketToast, SOCKET_EVENTS} from './type';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333', {
  autoConnect: false,
  transports: ['websocket']
});

export const socketUpdateRoom = () => {
  socket.emit(SOCKET_EVENTS.updateRoom);
};

export const socketJoinRoom = () => {
  socket.emit(SOCKET_EVENTS.joinRoom);
};

export const socketToast = (data: IsocketToast) => {
  socket.emit(SOCKET_EVENTS.toast, data);
};

export default socket;
