import {createContext, Dispatch, useContext} from 'react';

import {IAction} from './actions';
import initialState, {IState} from './state';

export const Context = createContext<IState>(initialState);
export const DispatchContext = createContext<Dispatch<IAction>>(() => undefined);

export const useStateRoom = () => useContext<IState>(Context);
export const useDispatchRoom = () => useContext(DispatchContext);
