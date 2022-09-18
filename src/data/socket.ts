import {io} from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333');

export const socketUpdateRoom = (data: {roomId: string}) => {
  console.log('UpdateRoom Emit');
  socket.emit('UpdateRoom', data);
};

export const socketToastConnected = (data: {roomId: string; authId: string}) => {
  console.log('ToastConnected Emit');
  socket.emit('ToastConnected', data);
};

export default socket;
