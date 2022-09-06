import {IUserResponse} from '@/types';

export type IState = IUserResponse | false | null;

const initialState: IState = null;

export default initialState;
