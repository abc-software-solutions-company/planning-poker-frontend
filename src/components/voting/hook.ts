import {useEffect, useState} from 'react';

import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {IRoomFullResponse} from '@/data/api/types/room.type';
import socket, {socketJoinRoom, socketToast, socketUpdateRoom} from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';

import {IVoteRoomProps} from '.';

export default function useVoting({roomId}: IVoteRoomProps) {
  const [roomData, setRoomData] = useState<IRoomFullResponse>();
  console.log('🚀 ~ file: hook.ts ~ line 15 ~ useVoting ~ roomData', roomData);
  const [votedData, setDataVoted] = useState<(number | null)[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const auth = useStateAuth();
  socket.auth = {...auth, roomId};
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
          socketUpdateRoom();
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
          socketUpdateRoom();
          socketToast({type: 'success', title: 'Success!', content: 'Show all votes'});
        } else {
          toast.show({
            type: 'warning',
            title: 'Success!',
            content: 'No users have voted yet'
          });
        }
      });
  };

  const onClickCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.show({
      type: 'success',
      title: 'Success!',
      content: 'Copy success'
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
            socketJoinRoom();
          }
        });
      }
    }
    if (auth && roomData?.story && roomData.story.avgPoint === null) {
      if (roomData.users.filter(user => user.id === auth.id && user.votePoint === undefined).length === 1) {
        api.userStory.create({storyId: roomData.story.id}).then(({status}) => {
          if (status === 201) {
            socketUpdateRoom();
          }
        });
      }
    }
    if (roomData && !roomData.story && isHost) setOpenModal(!roomData.story);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  useEffect(() => {
    socket.connect();

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log(SOCKET_EVENTS.reconnect, attempt);
      updateRoom();
    });

    socket.on(SOCKET_EVENTS.toast, data => {
      toast.show(data);
    });

    socket.on(SOCKET_EVENTS.updateRoom, () => {
      console.log(SOCKET_EVENTS.updateRoom);
      updateRoom();
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.toast);
      socket.off(SOCKET_EVENTS.updateRoom);
    };
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
