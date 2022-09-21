import * as types from './types';

interface IPayload {
  id: string;
  name: string;
}

export interface IAction {
  type: typeof types.LOGIN;
  payload: IPayload;
}

export const login = (payload: IPayload): IAction => {
  return {type: types.LOGIN, payload};
};
