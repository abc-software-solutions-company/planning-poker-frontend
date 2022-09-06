import {IUserResponse} from '@/data/client/user.client';

export type IState = IUserResponse | false | null;

const initialState: IState = null;

export default initialState;
