import {useEffect, useState} from 'react';

import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import socket, {socketJoin, socketJoinRoom, socketUpdateRoom} from '@/data/socket';
import {IRoomFullResponse} from '@/data/types/room.type';

import {IVoteRoomProps} from '.';

export default function useVoting({roomId}: IVoteRoomProps) {
  const [roomData, setRoomData] = useState<IRoomFullResponse>();
  console.log('🚀 ~ file: hook.ts ~ line 15 ~ useVoting ~ roomData', roomData);
  const [votedData, setDataVoted] = useState<(number | null)[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const auth = useStateAuth();
  const toast = useToast();
  const isHost = roomData && auth && auth.id === roomData.hostUserId;
  const isCompleted = roomData?.story && roomData.story.avgPoint !== null;

  const updateRoom = () => {
    api.room.get({id: roomId}).then(({status, data}) => {
      if (status === 200) {
        setRoomData(data);
      }
    });
  };

  const onSelectPoker = async (value: number) => {
    if (auth && roomData?.story) {
      api.userStory.update({storyId: roomData.story.id, votePoint: value}).then(({status}) => {
        if (status === 200) {
          socketUpdateRoom({roomId});
        }
      });
    }
  };

  const onClickNext = () => {
    if (isHost) {
      setOpenModal(true);
    }
  };

  const onClickComplete = () => {
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

  const onClickCopy = (text: string) => {
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
      setDataVoted(roomData?.users?.map(({votePoint}) => (votePoint === undefined ? null : votePoint)));
    }

    if (auth && roomData) {
      if (roomData.users.filter(user => user.id === auth.id).length === 0) {
        api.userRoom.create({roomId}).then(({status}) => {
          if (status === 201) {
            socketJoinRoom({roomId, auth});
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
    if (roomData && !roomData.story && isHost) setOpenModal(!roomData.story);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  useEffect(() => {
    socketJoin({roomId});

    socket.on('connect', () => {
      console.log('connect');
    });

    socket.io.on('reconnect', attempt => {
      console.log('🚀 ~ file: hook.ts ~ line 121 ~ socket.io.on ~ attempt', attempt);
      updateRoom();
    });

    socket.on('ToastJoinRoom', function (data: any) {
      console.log('🚀 ~ file: hook.ts ~ line 125 ~ data', data);
      if (data && auth && data.id !== auth.id)
        toast.show({
          type: 'info',
          title: 'Join',
          content: `${data.name} joined the room`,
          lifeTime: 3000
        });
    });

    socket.on('UpdateRoom', function () {
      console.log('UpdateRoom');
      updateRoom();
    });

    socket.on('disconnect', function () {
      console.log('disconnected');
      // socketUpdateRoom({roomId});
    });

    return () => {
      socket.off('connect');
      socket.off('reconnect');
      socket.off('ToastJoinRoom');
      socket.off('UpdateRoom');
      socket.off('disconnect');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    auth,
    roomData,
    votedData,
    openModal,
    isHost,
    isCompleted,
    setRoomData,
    onClickCopy,
    setOpenModal,
    onClickNext,
    onClickComplete,
    onSelectPoker
  };
}
