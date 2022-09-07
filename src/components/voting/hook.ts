import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {io} from 'socket.io-client';

import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import {createAtc} from '@/data/client/Atc.client';
import {createResult, getResult, updateResult} from '@/data/client/Result.client';
import {getRoom, IRoomResponse} from '@/data/client/room.client';
import {completeStory} from '@/data/client/story.client';

interface IHookParams {
  room: IRoomResponse;
  setRoom: Dispatch<SetStateAction<IRoomResponse>>;
}

export default function useVoting({room, setRoom}: IHookParams) {
  const story = room.stories.length > 0 ? room.stories[room.stories.length - 1] : null;
  const auth = useStateAuth();
  const toast = useToast();
  const [selectedPoker, setSelectedPoker] = useState<number | null>(null);
  const [dataVote, setDataVote] = useState<(number | null)[]>();
  const [openModal, setOpenModal] = useState<boolean>(!Boolean(story));
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3334');

  const updateRoom = () => {
    getRoom({id: room.id}).then(res => {
      if (res.status === 200 && res.data) {
        setRoom(res.data);
      }
    });
  };

  const initialRoom = () => {
    if (auth && story) {
      if (story.avgPoint) {
        setDataVote(room.stories.filter(s => (s.id = story.id))[0].results.map(r => r.votePoint));
      } else {
        getResult({storyId: story.id, userId: auth.id}).then(res => {
          if (res.status === 200) {
            setSelectedPoker(res.data.votePoint);
          }
        });
      }
    }
  };

  const handleSelectPoker = async (value: number) => {
    if (auth && story) {
      updateResult({storyId: story.id, userId: auth.id, votePoint: value}).then(res => {
        if (res.status === 200) {
          setSelectedPoker(res.data.votePoint);
          socket.emit('update');
        }
      });
    }
  };

  const handleNewStory = () => {
    if (auth && story && story.avgPoint != null) {
      setOpenModal(true);
    }
  };

  const handleNewUser = () => {
    if (auth) {
      if (!room.acts.map(act => act.userId).includes(auth.id)) {
        createAtc({roomId: room.id, userId: auth.id}).then(res => {
          if (res.status === 201) {
            if (story && story.avgPoint === null) {
              createResult({storyId: story.id, userId: auth.id, votePoint: null}).then(res1 => {
                if (res1.status === 201) {
                  socket.emit('update');
                }
              });
            }
          }
        });
      }
    }
  };

  const isHost = () => {
    if (auth) return auth.id === room.hostUserId;
    return false;
  };

  const handleComplete = () => {
    if (!dataVote && isHost() && story)
      completeStory({id: story.id}).then(res => {
        if (res.status === 200) {
          setDataVote(room.stories.filter(s => (s.id = story.id))[0].results.map(r => r.votePoint));
          updateRoom();
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
    handleNewUser();
    socket.on('connect', function () {
      console.log('Connected');
    });
    socket.on('update', function () {
      console.log('update');
      updateRoom();
    });
    socket.on('disconnect', function () {
      console.log('Disconnected');
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    initialRoom();
    setOpenModal(story === null);
    if (story && story.avgPoint === null) {
      setDataVote(undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  return {
    auth,
    story,
    toast,
    dataVote,
    openModal,
    selectedPoker,
    isHost,
    updateRoom,
    handleCopy,
    setDataVote,
    initialRoom,
    setOpenModal,
    handleNewUser,
    handleNewStory,
    handleComplete,
    handleSelectPoker
  };
}
