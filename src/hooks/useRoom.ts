import {RoomActions, useStateRoom} from '@/contexts/room';
import {useDispatchRoom} from '@/contexts/room/context';
import {IRoomFullResponse} from '@/data/api/types/room.type';
import {StoryTypes} from '@/utils/constant';

export default function useRoom() {
  const roomState = useStateRoom();
  const dispatchRoom = useDispatchRoom();

  const setRoomData = (param: IRoomFullResponse) => {
    dispatchRoom(RoomActions.update({roomData: param}));
  };

  const setOpenModal = (param: boolean) => {
    dispatchRoom(RoomActions.update({openModal: param}));
  };

  const setStoryType = (param: keyof typeof StoryTypes) => {
    dispatchRoom(RoomActions.update({storyType: param}));
  };

  return {
    ...roomState,
    setRoomData,
    setOpenModal,
    setStoryType
  };
}
