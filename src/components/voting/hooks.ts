import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import socket, {socketJoinRoom, socketToast, socketUpdateRoom, socketUpdateRoomExceptMe} from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import useRoom from '@/hooks/useRoom';
import {StoryTypes} from '@/utils/constant';

import {IVoteRoomProps} from '.';

export default function useVoting({roomId}: IVoteRoomProps) {
  const {openModal, roomData, storyType, setOpenModal, setRoomData} = useRoom();
  const [votedData, setVotedData] = useState<(string | null)[]>();
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const auth = useStateAuth();
  const toast = useToast();
  const isHost = roomData && auth && auth.id === roomData.hostUserId;
  const isCompleted = roomData?.story && roomData.story.avgPoint !== null;
  const router = useRouter();

  const updateRoom = () => {
    api.room.get({id: roomId}).then(({status, data}) => {
      if (status === 200) {
        setRoomData(data);
      }
    });
  };

  const onSelectPoker = async (value: number) => {
    if (auth && roomData?.story) {
      const roomDataTemp = {...roomData};
      roomDataTemp.users.filter(u => u.id === auth.id)[0].votePoint = value;
      setRoomData(roomDataTemp);
      if (roomData.users.filter(u => u.id === auth.id)[0].votePoint === null)
        api.userStory.update({storyId: roomData.story.id, votePoint: value}).then(({status}) => {
          if (status === 200) {
            updateRoom();
            socketUpdateRoomExceptMe();
          }
        });
      else
        api.userStory.update({storyId: roomData.story.id, votePoint: value}).then(({status}) => {
          if (status === 200) {
            updateRoom();
          }
        });
    } else {
      toast.show({
        type: 'info',
        title: 'Story',
        content: 'Please wait for the host to set up the story'
      });
    }
  };

  const onClickNext = () => {
    if (isHost) {
      setOpenModal(true);
    }
  };

  const onClickComplete = () => {
    setDisableBtn(true);
    if (isHost && roomData?.story?.avgPoint === null)
      api.story.complete({id: roomData.story.id}).then(res => {
        if (res.status === 200) {
          socketUpdateRoom();
          socketToast({type: 'success', title: 'Success!', content: 'Show all votes'});
        } else {
          toast.show({
            type: 'warning',
            title: 'warning!',
            content: 'No users have voted yet'
          });
          setDisableBtn(false);
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
    if (roomData && roomData.story && roomData.story.avgPoint !== null) {
      setVotedData(
        roomData.users.map(({votePoint}) =>
          votePoint || votePoint === 0 ? StoryTypes[roomData.story?.type || 'Fibonacci'][votePoint] : null
        )
      );
    }
    const promiseArr = [];

    if (auth && roomData) {
      if (roomData.users.filter(user => user.id === auth.id).length === 0) {
        promiseArr.push(
          api.userRoom.create({roomId}).then(({status}) => {
            if (status === 201) {
              socketJoinRoom();
            }
          })
        );
      }
    }
    if (auth && roomData?.story && roomData.story.avgPoint === null) {
      if (roomData.users.filter(user => user.id === auth.id && user.votePoint === undefined).length === 1) {
        promiseArr.push(api.userStory.create({storyId: roomData.story.id}));
      }
    }
    if (promiseArr.length > 0) {
      Promise.allSettled(promiseArr).finally(() => {
        socketUpdateRoom();
      });
    }
    if (roomData && !roomData.story && isHost) setOpenModal(!roomData.story);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, roomId};
      socket.connect();
    }

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

    socket.on(SOCKET_EVENTS.updateRoomExceptMe, () => {
      console.log(SOCKET_EVENTS.updateRoomExceptMe);
      updateRoom();
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.toast);
      socket.off(SOCKET_EVENTS.updateRoom);
      socket.off(SOCKET_EVENTS.updateRoomExceptMe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    const disconnect = () => {
      socket.disconnect();
    };
    router.events.on('routeChangeStart', disconnect);
    return () => {
      router.events.off('routeChangeStart', disconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisableBtn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData?.story?.id]);
  return {
    auth,
    roomData,
    openModal,
    setOpenModal,
    storyType,
    votedData,
    isHost,
    disableBtn,
    isCompleted,
    setRoomData,
    onClickCopy,
    onClickNext,
    onClickComplete,
    onSelectPoker
  };
}
