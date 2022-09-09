import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Manager} from 'socket.io-client';

import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import {createAtc} from '@/data/client/Atc.client';
import {createResult, updateResult} from '@/data/client/Result.client';
import {getRoom, IRoomResponse} from '@/data/client/room.client';
import {completeStory} from '@/data/client/story.client';
import {ISocketUpdate} from '@/types';

const manager = new Manager(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3334');
interface IHookParams {
  room: IRoomResponse;
  setRoom: Dispatch<SetStateAction<IRoomResponse>>;
}

export default function useVoting({room, setRoom}: IHookParams) {
  const story = room.stories.length > 0 ? room.stories[room.stories.length - 1] : null;
  console.log('🚀 ~ file: hook.ts ~ line 19 ~ useVoting ~ story', story);
  const socket = manager.socket('/').;

  const auth = useStateAuth();
  const toast = useToast();
  const [dataVoted, setDataVoted] = useState<(number | null)[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const updateRoom = (id: number) => {
    getRoom({id}).then(res => {
      if (res.status === 200 && res.data) {
        setRoom(res.data);
      }
    });
  };

  const socketUpdate = () => {
    socket.emit('update', {roomId: room.id});
  };

  const isHost = () => {
    if (auth) return auth.id === room.hostUserId;
    return false;
  };

  const handleStart = () => {
    if (auth) {
      if (room.acts.filter(atc => atc.userId === auth.id).length === 0) {
        createAtc({roomId: room.id, userId: auth.id}).then(res => {
          if (res.status === 201) {
            socketUpdate();
          }
        });
      }
    }
  };

  const handleUpdateRoom = () => {
    if (auth) {
      if (story && story.avgPoint === null && story.results.filter(s => s.userId === auth.id).length === 0) {
        createResult({storyId: story.id, userId: auth.id, votePoint: null}).then(res => {
          if (res.status === 201) {
            socketUpdate();
          }
        });
      }
      if (isHost()) setOpenModal(!story);

      if (story) {
        if (story.avgPoint) {
          setDataVoted(story.results.map(r => r.votePoint));
        } else {
          setDataVoted(undefined);
        }
      }
    }
  };

  const handleSelectPoker = async (value: number) => {
    if (auth && story) {
      updateResult({storyId: story.id, userId: auth.id, votePoint: value}).then(res => {
        if (res.status === 200) {
          socketUpdate();
        }
      });
    }
  };

  const handleNewStory = () => {
    if (isHost() && story && story.avgPoint !== null) {
      setOpenModal(true);
    }
  };

  const handleComplete = () => {
    if (isHost() && story)
      completeStory({id: story.id}).then(res => {
        if (res.status === 200) {
          socketUpdate();
          toast.show({
            type: 'success',
            title: 'Success!',
            content: 'Show all votes',
            lifeTime: 3000
          });
        } else {
          toast.show({
            type: 'warning',
            title: 'Success!',
            content: 'No users have voted yet',
            lifeTime: 3000
          });
        }
      });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.show({
      type: 'success',
      title: 'Success!',
      content: 'Copy success',
      lifeTime: 3000
    });
  };

  useEffect(() => {
    handleStart();
    socket.on('connection', socket => {
      socket.join(room.id);
    });
    socket.on('online', function () {
      console.log('online');
    });

    socket.on('update', function ({roomId}: ISocketUpdate) {
      console.log('update');
      updateRoom(roomId);
    });

    socket.on('offline', function () {
      console.log('offline');
    });

    return () => {
      socket.off('online');
      socket.off('update');
      socket.off('offline');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleUpdateRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);
  console.log(socket);

  return {
    auth,
    story,
    toast,
    socket,
    dataVoted,
    openModal,
    isHost,
    handleCopy,
    socketUpdate,
    setOpenModal,
    handleNewStory,
    handleComplete,
    handleSelectPoker
  };
}
