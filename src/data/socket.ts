import {io} from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333');

export const socketUpdateRoom = (data: {roomId: string}) => {
  console.log('updateRoom Emit');
  socket.emit('updateRoom', data);
};

export default socket;
