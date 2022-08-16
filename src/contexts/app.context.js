/* eslint-disable react/jsx-filename-extension */
import {createContext, useContext, useReducer} from 'react';

import useInitialState from '../hooks/useInitialState';

const AppContext = createContext();
const AppDispatchContext = createContext();
export const AppContextProvider = ({children}) => {
  const {reducer, initialState} = useInitialState();
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppContext.Provider value={state}>{children}</AppContext.Provider>
    </AppDispatchContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export const useAppDispatchContext = () => useContext(AppDispatchContext);
