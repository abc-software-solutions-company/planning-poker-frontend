import {io} from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333');

interface ISocketUpdateRoom {
  roomId: string;
}

interface ISocketJoin {
  roomId: string;
}

interface ISocketJoinRoon {
  roomId: string;
  auth: {id: string; name: string};
}

export const socketUpdateRoom = (data: ISocketUpdateRoom) => {
  socket.emit('UpdateRoom', data);
};

export const socketJoin = (data: ISocketJoin) => {
  socket.emit('Join', data);
};

export const socketJoinRoom = (data: ISocketJoinRoon) => {
  socket.emit('JoinRoom', data);
};

export default socket;
