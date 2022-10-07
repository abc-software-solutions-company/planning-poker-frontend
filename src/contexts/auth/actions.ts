import * as types from './types';

interface IPayload {
  id?: string;
  name: string;
}

export interface IAction {
  type: typeof types.UPDATE;
  payload: IPayload;
}

export const UPDATE = (payload: IPayload): IAction => {
  return {type: types.UPDATE, payload};
};
