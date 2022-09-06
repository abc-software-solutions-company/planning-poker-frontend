import {useState} from 'react';

import {useStateAuth} from '@/contexts/auth';
import useToast from '@/core-ui/toast';
import {createAtc} from '@/data/client/Atc.client';
import {createResult, getResult, updateResult} from '@/data/client/Result.client';
import {getRoom, IRoomResponse} from '@/data/client/room.client';
import {completeStory} from '@/data/client/story.client';

interface IHookParams {
  room: IRoomResponse;
  setRoom: React.Dispatch<React.SetStateAction<IRoomResponse>>;
}

export default function useVoting({room, setRoom}: IHookParams) {
  const auth = useStateAuth();
  const toast = useToast();
  const story = room.stories?.filter(e => e.avgPoint === null)[0];
  const [selectedPoker, setSelectedPoker] = useState<number>();
  const [isFinish, setIsFinish] = useState<boolean>(Boolean(story?.avgPoint));

  const updateRoom = () => {
    getRoom({id: room.id}).then(res => {
      if (res.status === 200 && res.data) {
        setRoom(res.data);
      }
    });
  };
  const intialRoom = () => {
    console.log('🚀 ~ file: hook.ts ~ line 31 ~ intialRoom ~ auth && story', auth);
    if (auth && story) {
      getResult({storyId: story.id, userId: auth.id}).then(res => {
        if (res.status === 200) {
          setSelectedPoker(res.data.votePoint);
        }
      });
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

  const handleNewUser = () => {
    if (auth) {
      if (!room.acts.map(act => act.userId).includes(auth.id)) {
        createAtc({roomId: room.id, userId: auth.id}).then(res => {
          if (res.status === 201) {
            updateRoom();
          }
        });
      }
    }
  };

  const handleFinish = () => {
    if (!isFinish && auth && auth.id === room.hostUserId && story)
      completeStory({id: story.id}).then(res => {
        if (res.status === 200) {
          setIsFinish(true);
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

  return {
    story,
    auth,
    selectedPoker,
    isFinish,
    updateRoom,
    intialRoom,
    handleCopy,
    handleNewUser,
    handleSelectPoker,
    handleFinish
  };
}
