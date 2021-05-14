
import {action, createReducer} from 'typesafe-actions';
import { loginUserAction, logoutUserAction, registerUserAction, todoUserAction, patchUserAction, todoDeleteAction, todoPatchAction, todoPostAction} from './actions';
import {Actions, UserState} from './types';

export const initialState: UserState = {}

export const userReducer = createReducer<UserState, Actions>(initialState)
                                //Register actions
                                .handleAction(
                                    registerUserAction.request,
                                    (state, action) =>({
                                        ...state,
                                        errorMessage: '',
                                        username: action.payload.username
                                    })
                                )
                                .handleAction(
                                    registerUserAction.success,
                                    (state) => ({
                                        ...state,
                                        errorMessage:''
                                    })
                                )
                                .handleAction(
                                    registerUserAction.failure,
                                    (state, action) => ({
                                        ...state,
                                        errorMessage: action.payload.message,
                                    })
                                )
                                //Login actions
                                .handleAction(
                                    loginUserAction.request,
                                    (state) => ({
                                        ...state,
                                        errorMessage: ''
                                    })
                                )
                                .handleAction(
                                    loginUserAction.success,
                                    (state, action) => ({
                                        ...state,
                                        auth: {
                                            accessToken: action.payload.accessToken,
                                        },
                                        username: action.payload.username
                                    })
                                )
                                .handleAction(
                                    loginUserAction.failure,
                                    (state, action) => ({
                                        ...state,
                                        errorMessage: action.payload.message,
                                    })
                                )
                                //logout
                                .handleAction(
                                    logoutUserAction.success,
                                    (state, action) => ({
                                        ...state,
                                        auth: {
                                            accessToken: ""
                                        },
                                    })
                                )
                                .handleAction(
                                    logoutUserAction.request,
                                    (state) => ({
                                        ...state,
                                        errorMessage: ''
                                    })
                                )
                                //todo
                                .handleAction(
                                    todoUserAction.request,
                                    (state) => ({
                                        ...state,
                                        errorMessage: ''
                                    })
                                )
                                .handleAction(
                                    todoUserAction.success,
                                    (state, action) => ({
                                        ...state,
                                        todos: action.payload.todos
                                    })
                                )
                                .handleAction(
                                    todoUserAction.failure,
                                    (state, action) => ({
                                        ...state,
                                        errorMessage: action.payload.message,
                                    })
                                )
                                //patch
                                .handleAction(
                                    patchUserAction.request,
                                    (state) => ({
                                        ...state,
                                        
                                        errorMessage: ''
                                    })
                                )
                                .handleAction(
                                    patchUserAction.success,
                                    (state, action) => ({
                                        ...state,
                                    })
                                )
                                .handleAction(
                                    patchUserAction.failure,
                                    (state, action) => ({
                                        ...state,
                                        errorMessage: action.payload.message,
                                    })
                                )
                                // post todo
                                .handleAction(
                                    todoPostAction.request,
                                    (state) => ({
                                        ...state,
                                        
                                        errorMessage: ''
                                    })
                                )
                                .handleAction(
                                    todoPostAction.success,
                                    (state, action) => ({
                                        ...state,
                                    })
                                )
                                .handleAction(
                                    todoPostAction.failure,
                                    (state, action) => ({
                                        ...state,
                                        errorMessage: action.payload.message,
                                    })
                                )
                                // patch todo
                                .handleAction(
                                    todoPatchAction.request,
                                    (state) => ({
                                        ...state,
                                        
                                        errorMessage: ''
                                    })
                                )
                                .handleAction(
                                    todoPatchAction.success,
                                    (state, action) => ({
                                        ...state,
                                    })
                                )
                                .handleAction(
                                    todoPatchAction.failure,
                                    (state, action) => ({
                                        ...state,
                                        errorMessage: action.payload.message,
                                    })
                                )
                                // delete todo
                                .handleAction(
                                    todoDeleteAction.request,
                                    (state) => ({
                                        ...state,
                                        
                                        errorMessage: ''
                                    })
                                )
                                .handleAction(
                                    todoDeleteAction.success,
                                    (state, action) => ({
                                        ...state,
                                    })
                                )
                                .handleAction(
                                    todoDeleteAction.failure,
                                    (state, action) => ({
                                        ...state,
                                        errorMessage: action.payload.message,
                                    })
                                )
                                