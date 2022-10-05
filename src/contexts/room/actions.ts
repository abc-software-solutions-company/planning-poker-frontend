import {IRoomFullResponse} from '@/data/api/types/room.type';
import {StoryTypes} from '@/utils/constant';

import types from './types';

interface IPayload {
  roomData?: IRoomFullResponse;
  openModal?: boolean;
  storyType?: keyof typeof StoryTypes;
}

export interface IAction {
  type: typeof types.update;
  payload: IPayload;
}

export const update = (payload: IPayload): IAction => {
  return {type: types.update, payload};
};
