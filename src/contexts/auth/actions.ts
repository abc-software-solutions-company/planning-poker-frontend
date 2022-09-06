import {IState} from './state';
import * as types from './types';

export interface IAction {
  type: typeof types.LOGIN;
  payload: IState;
}
export const login = (payload: IState): IAction => {
  return {type: types.LOGIN, payload};
};
