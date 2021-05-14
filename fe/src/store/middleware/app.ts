import { 
    MiddlewareAPI,
    Dispatch,
    AnyAction,
} from 'redux';
import { ApplicationState } from '../types';
import { 
    LocationChangeAction 
} from 'connected-react-router';
export const appMiddleware = ({
    dispatch,
    getState,
}: MiddlewareAPI<Dispatch<AnyAction>, ApplicationState>) => (next: Dispatch) => (action: LocationChangeAction) => {
    const result = next(action);  
    return result;
  } 