import { RouterState } from 'connected-react-router';
import { UserState } from './user/types';


export interface ApplicationState {
    user: UserState;
    router: RouterState;
};