import { combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import { all, fork } from 'redux-saga/effects';
import {userReducer} from './user/reducer';
import userSaga from './user/sagas';
import { createBrowserHistory } from 'history';


export const history = createBrowserHistory();

export const rootReducer = combineReducers({
    router: connectRouter(history),
    user: userReducer
});

export function* rootSaga(): Generator {
    yield all([
        fork(userSaga)
    ]);
}