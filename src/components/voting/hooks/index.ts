import {getSession} from 'next-auth/react';

import {getUSR, getUSRsbyRoom} from '@/data/client/room.client';
import {IFullUSR} from '@/types';

interface IupdateRoom {
  roomId: number;
  setUSRs: React.Dispatch<React.SetStateAction<IFullUSR[] | undefined>>;
}
interface IcheckRoom {
  roomId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useVoting() {
  function updateRoom({roomId, setUSRs}: IupdateRoom) {
    getUSRsbyRoom({roomId}).then(res => {
      if (res.status === 200) {
        setUSRs(res.data);
      }
    });
  }
  async function checkRoom({roomId, setOpen}: IcheckRoom) {
    const session = await getSession();
    const userId = String(session?.user.id);
    if (userId) {
      const usr = getUSR({roomId});
      usr.then(res => {
        if (!res.data) {
          setOpen(true);
        }
      });
    }
  }
  return {updateRoom, checkRoom};
}
