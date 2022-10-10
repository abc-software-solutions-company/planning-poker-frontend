import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {useStateAuth} from '@/contexts/auth';
import {IChartData} from '@/core-ui/doughnut-chart';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import socket, {socketJoinRoom, socketToast, socketUpdateRoom, socketUpdateRoomExceptMe} from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import useRoom from '@/hooks/useRoom';
import {ChartColors, StoryTypes} from '@/utils/constant';

import {tracking} from '../common/third-party/tracking';
import {IVoteRoomProps} from '.';

export default function useVoting({roomId}: IVoteRoomProps) {
  const {roomData, storyType, setStoryType, setOpenModal, setRoomData} = useRoom();
  const [chartData, setChartData] = useState<IChartData[]>();
  const [disableAction, setDisableBtn] = useState<boolean>(false);
  const auth = useStateAuth();
  const toast = useToast();
  const isHost = roomData && auth && auth.id === roomData.hostUserId;

  const router = useRouter();

  const updateRoom = () => {
    api.room.get({id: roomId}).then(({status, data}) => {
      if (status === 200) {
        setRoomData(data);
        if (data.story) setStoryType(data.story.type);
      }
    });
  };

  const onSelectPoker = async (value: number) => {
    if (auth && roomData?.story) {
      const curentVotePoint = roomData.users.filter(u => u.id === auth.id)[0].votePoint;
      const roomDataTemp = {...roomData};
      roomDataTemp.users.filter(u => u.id === auth.id)[0].votePoint = value;
      setRoomData(roomDataTemp);
      api.userStory.update({storyId: roomData.story.id, votePoint: value}).then(({status}) => {
        if (status === 200) {
          if (curentVotePoint === null) socketUpdateRoomExceptMe();
        } else {
          toast.show({
            type: 'danger',
            title: 'Select Story Error',
            content: 'An error occurred, please try again'
          });
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

  const onNext = () => {
    tracking.event({name: 'Next Story'});
    if (isHost) {
      setOpenModal(true);
    }
  };

  const onComplete = () => {
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

  useEffect(() => {
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
      } else {
        if (!roomData.users.filter(user => user.id === auth.id)[0].isOnline) {
          promiseArr.push(api.userRoom.update({isOnline: true, roomId}));
        }
      }
      if (roomData?.story && roomData.story.avgPoint === null) {
        if (roomData.users.filter(user => user.id === auth.id)[0]?.votePoint === undefined)
          promiseArr.push(api.userStory.create({storyId: roomData.story.id}));
      }
    }

    if (promiseArr.length > 0) {
      Promise.allSettled(promiseArr).then(() => {
        socketUpdateRoom();
      });
    }

    if (roomData && !roomData.story && isHost) setOpenModal(!roomData.story);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  useEffect(() => {
    if (roomData && roomData.story && roomData.story.avgPoint !== null) {
      const typeData = StoryTypes[storyType];
      const data: IChartData[] = Object.keys(typeData).map((value, index) => {
        return {
          label: typeData[Number(value)],
          value: roomData?.users.filter(({votePoint}) => votePoint === Number(value)).length || 0,
          color: String(ChartColors[index])
        };
      });
      setChartData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData?.story?.avgPoint]);

  useEffect(() => {
    setDisableBtn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData?.story?.id]);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, roomId};
      socket.connect();
      updateRoom();
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
      updateRoom();
    });

    socket.on(SOCKET_EVENTS.toast, data => {
      toast.show(data);
    });

    socket.on(SOCKET_EVENTS.updateRoom, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateRoom);
      updateRoom();
    });

    socket.on(SOCKET_EVENTS.updateRoomExceptMe, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateRoomExceptMe);
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

  return {auth, chartData, isHost, disableAction, onNext, onComplete, onSelectPoker};
}
