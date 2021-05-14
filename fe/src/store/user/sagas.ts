import {
    all,
    fork, 
    put,
    call, 
    takeLatest,
    select,
} from 'redux-saga/effects';
import ApiCall from '../middleware/api';
import Endpoints from '../../appconfig/apiendpoints';
import {ActionType} from 'typesafe-actions';
import { history } from '../root';
import { loginUserAction, logoutUserAction, patchUserAction, registerUserAction, todoUserAction, todoDeleteAction, todoPatchAction, todoPostAction } from './actions';
import Routes from '../../appconfig/routes';
import {todo} from './types'
import { tokenSelector } from './selectors';
import {ApplicationState} from '../../store/types';
import StateManager from 'react-select';

function* handleRegisterUserRequest(action: ActionType<typeof registerUserAction.request>): Generator {
    try {
        const {
            username,
            password,
            email
        } = action.payload

        const route = Endpoints.register;
        

        (yield call(ApiCall.post, route, {
            data: {
                username: username,
                password: password,
                email: email
            },
        }, false)) as {
            accessToken: string
        };

        yield put(registerUserAction.success());
        yield call(history.push, Routes.home);
    } catch (err) {
        yield put(registerUserAction.failure(err));
    }
}

function* handleLoginUserRequest(action: ActionType<typeof loginUserAction.request>): Generator {
    try {        
        const {
            username,
            password
        } = action.payload;

        const response = (yield call(ApiCall.post, Endpoints.login, {
            data: {
                username: username,
                password: password,    
            }
        }, false)) as string

        yield put(loginUserAction.success({
            accessToken: response,
            username: username
        }));
        
        const response1 = (yield call(ApiCall.get, Endpoints.todo,{}, false)) as todo[]
        yield put(todoUserAction.success({
           todos: response1 
        }))

        yield call(history.push, '/');
    } catch (err) {
        yield put(loginUserAction.failure(err));
    }
}


function* handleLogoutUserRequest(action: ActionType<typeof logoutUserAction.request>): Generator {
    try{
        yield put(logoutUserAction.success({
            accessToken: "",
        }));
        yield call(history.push, '/');
    }
    
    catch (err) {
        yield put(logoutUserAction.failure(err));
    }
}

function* handlePatchUserRequest(action: ActionType<typeof patchUserAction.request>): Generator {
    try{
        const {
            password
        } = action.payload;

        const response = (yield call(ApiCall.patch, Endpoints.user, {
            data: {
                username: "",
                password: password,    
            }
        }, false))
        yield call(history.push, '/');
    }
    
    catch (err) {
        yield put(patchUserAction.failure(err));
    }
}

function* handlePostTodoRequest(action: ActionType<typeof todoPostAction.request>): Generator {
    try{
        const {
            task
        } = action.payload;

        const response = (yield call(ApiCall.post, Endpoints.todo, {
            data: {
                username: "",
                task:task,
                date: (new Date).toISOString()   
            }
        }, false)) as todo[]

        yield put(todoUserAction.success({
            todos: response
         }))
        yield call(history.push, '/');
    }
    
    catch (err) {
        yield put(patchUserAction.failure(err));
    }
}

function* handlePatchTodoRequest(action: ActionType<typeof todoPatchAction.request>): Generator {
    try{
        const {
            id,
            task,
            isCompleted
        } = action.payload;

        const response = (yield call(ApiCall.patch, Endpoints.todo+'/'+id, {
            data: {
                username: "",
                id:id,
                task: task,
                isCompleted: isCompleted
            }
        }, false)) as todo[]
        yield put(todoUserAction.success({
            todos: response
         }))
        yield call(history.push, '/');
    }
    
    catch (err) {
        yield put(patchUserAction.failure(err));
    }
}

function* handleDeleteTodoRequest(action: ActionType<typeof todoDeleteAction.request>): Generator {
    try{
        const {
            id
        } = action.payload;

        const response = (yield call(ApiCall.delete, Endpoints.todo+'/'+id, {
            data: {
            }
        }, false)) as todo[]
        yield put(todoUserAction.success({
            todos: response
         }))
        yield call(history.push, '/');
    }
    catch (err) {
        yield put(patchUserAction.failure(err));
    }
}

function* watchRegisterUserRequestSaga(): Generator {
    yield takeLatest(registerUserAction.request, handleRegisterUserRequest);
}

function* watchLoginUserRequestSaga(): Generator {
    yield takeLatest(loginUserAction.request, handleLoginUserRequest)
}

function* watchLogoutUserSaga(): Generator{
    yield takeLatest(logoutUserAction.request, handleLogoutUserRequest);
}

function* watchPatchUserSaga(): Generator{
    yield takeLatest(patchUserAction.request, handlePatchUserRequest);
}

function* watchPostTodoSaga(): Generator{
    yield takeLatest(todoPostAction.request, handlePostTodoRequest);
}

function* watchPatchTodoSaga(): Generator{
    yield takeLatest(todoPatchAction.request, handlePatchTodoRequest);
}

function* watchDeletePatchSaga(): Generator{
    yield takeLatest(todoDeleteAction.request, handleDeleteTodoRequest);
}

function* userSaga(): Generator {
    yield all([
        fork(watchRegisterUserRequestSaga),
        fork(watchLoginUserRequestSaga),
        fork(watchLogoutUserSaga),
        fork(watchPatchUserSaga),
        fork(watchPostTodoSaga),
        fork(watchPatchTodoSaga),
        fork(watchDeletePatchSaga)
    ]);
}

export default userSaga;