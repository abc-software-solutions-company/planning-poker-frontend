import {useEffect, useState} from 'react';

import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import socket, {socketUpdateRoom} from '@/data/socket';
import {IRoomFullResponse} from '@/data/types/room.type';

import {IVoteRoomProps} from '.';

export default function useVoting({roomId}: IVoteRoomProps) {
  const [roomData, setRoomData] = useState<IRoomFullResponse>();
  console.log('🚀 ~ file: hook.ts ~ line 15 ~ useVoting ~ roomData', roomData);
  const [dataVoted, setDataVoted] = useState<(number | null)[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const auth = useStateAuth();
  console.log('🚀 ~ file: hook.ts ~ line 20 ~ useVoting ~ auth', auth);
  const toast = useToast();
  const isHost = roomData && auth && auth.id === roomData.hostUserId;

  const updateRoom = () => {
    api.room.get({id: roomId}).then(({status, data}) => {
      if (status === 200) {
        setRoomData(data);
      }
    });
  };

  const handleStart = () => {
    api.room.get({id: roomId}).then(({status, data}) => {
      if (status === 200) {
        setRoomData(data);
      }
    });
  };

  const handleSelectPoker = async (value: number) => {
    if (auth && roomData?.story) {
      api.userStory.update({storyId: roomData.story.id, votePoint: value}).then(({status}) => {
        if (status === 200) {
          socketUpdateRoom({roomId});
        }
      });
    }
  };

  const handleNewStory = () => {
    if (isHost && roomData?.story?.avgPoint !== null) {
      setOpenModal(true);
    }
  };

  const handleComplete = () => {
    if (isHost && roomData?.story?.avgPoint === null)
      api.story.complete({id: roomData.story.id}).then(res => {
        if (res.status === 200) {
          socketUpdateRoom({roomId});
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
    if (roomData?.story?.avgPoint !== null) {
      setDataVoted(roomData?.users?.map(user => user.votePoint || null));
    }

    if (auth && roomData) {
      if (roomData.users.filter(user => user.id === auth.id).length === 0) {
        api.userRoom.create({roomId}).then(({status}) => {
          if (status === 201) {
            socketUpdateRoom({roomId});
          }
        });
      }
    }
    if (auth && roomData?.story) {
      if (roomData.users.filter(user => user.id === auth.id && user.votePoint === undefined).length === 1) {
        api.userStory.create({storyId: roomData.story.id}).then(({status}) => {
          if (status === 201) {
            socketUpdateRoom({roomId});
          }
        });
      }
    }
    if (roomData && !roomData.story) setOpenModal(!roomData.story);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  useEffect(() => {
    handleStart();

    socket.emit('joinRoom', {roomId});

    socket.on('connect', () => {
      console.log('connect');
    });

    socket.on('updateRoom', function () {
      console.log('updateRoom');
      updateRoom();
    });

    socket.on('disconnect', function () {
      console.log('disconnected');
    });

    return () => {
      socket.off('connect');
      socket.off('updateRoom');
      socket.off('disconnect');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    auth,
    roomData,
    dataVoted,
    openModal,
    isHost,
    setRoomData,
    handleCopy,
    setOpenModal,
    handleNewStory,
    handleComplete,
    handleSelectPoker
  };
}
