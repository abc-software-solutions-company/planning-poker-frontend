import {IRoomFullResponse} from '@/data/api/types/room.type';
import {StoryTypes} from '@/utils/constant';

interface IRoomContext {
  roomData?: IRoomFullResponse;
  openModal: boolean;
  storyType: keyof typeof StoryTypes;
}

export type IState = IRoomContext;

const initialState: IState = {
  openModal: false,
  storyType: 'Fibonacci'
};

export default initialState;
