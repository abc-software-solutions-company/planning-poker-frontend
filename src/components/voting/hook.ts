import {Dispatch, SetStateAction, useEffect, useState} from 'react';

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
  const [isFinish, setIsFinish] = useState<(number | null)[]>();
  const [openModal, setOpenModal] = useState<boolean>(!Boolean(story));

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
        setIsFinish(room.stories.filter(s => (s.id = story.id))[0].results.map(r => r.votePoint));
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
      if (!selectedPoker) {
        createResult({storyId: story.id, userId: auth.id, votePoint: value}).then(res => {
          if (res.status === 201) {
            setSelectedPoker(res.data.votePoint);
            updateRoom();
          }
        });
      } else {
        updateResult({storyId: story.id, userId: auth.id, votePoint: value}).then(res => {
          if (res.status === 200) {
            setSelectedPoker(res.data.votePoint);
            updateRoom();
          }
        });
      }
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
            updateRoom();
          }
        });
      }
      if (story && story.avgPoint === null) {
        createResult({storyId: story.id, userId: auth.id, votePoint: null}).then(res => {
          if (res.status === 201) {
            updateRoom();
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
    if (!isFinish && isHost() && story)
      completeStory({id: story.id}).then(res => {
        if (res.status === 200) {
          setIsFinish(room.stories.filter(s => (s.id = story.id))[0].results.map(r => r.votePoint));
          updateRoom();
          toast.show({
            type: 'success',
            title: 'Success!',
            content: 'Show all votes',
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
    initialRoom();
    handleNewUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setOpenModal(story === null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  return {
    story,
    auth,
    isFinish,
    openModal,
    selectedPoker,
    isHost,
    updateRoom,
    handleCopy,
    initialRoom,
    setOpenModal,
    handleNewUser,
    handleNewStory,
    handleComplete,
    handleSelectPoker
  };
}
