import {IAction} from './actions';
import {IState} from './state';
import * as types from './types';

export default function reducer(state: IState, action: IAction): IState {
  const {type, payload} = action;
  switch (type) {
    case types.UPDATE: {
      return {...state, ...payload} as IState;
    }
    default:
      return state;
  }
}
