import * as types from './types';

export interface IAction {
  type: typeof types.LOGIN;
  payload: {
    userId?: string;
  };
}

export const login = (userId?: string): IAction => {
  return {type: types.LOGIN, payload: {userId}};
};
