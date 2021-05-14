import { 
    RegisterUserRequestPayload,
    LoginUserRequestPayload,
    LoginUserSuccessPayload,
    LogoutUserSuccessPayload,
    LogoutUserRequestPayload,
    TodoUserRequestPayload,
    TodoUserSuccessPayload,
    PatchUserRequestPayload,
    PatchUserSuccessPayload,
    TodoPatchRequestPayload,
    TodoPostRequestPayload,
    TodoDeleteRequestPayload
} from './types';
import { createAsyncAction } from 'typesafe-actions';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    TODO_REQUEST,
    TODO_SUCCESS,
    TODO_FAILURE,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILURE,
    TODO_CREATE_FAILURE,
    TODO_CREATE_REQUEST,
    TODO_CREATE_SUCCESS,
    TODO_DELETE_FAILURE,
    TODO_DELETE_REQUEST,
    TODO_DELETE_SUCCESS,
    TODO_PATCH_FAILURE,
    TODO_PATCH_REQUEST,
    TODO_PATCH_SUCCESS
} from './constants';

export const registerUserAction = createAsyncAction(
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
)<RegisterUserRequestPayload, void, Error>();

export const loginUserAction = createAsyncAction(
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
)<LoginUserRequestPayload, LoginUserSuccessPayload, Error>();

export const logoutUserAction = createAsyncAction(
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE
)<LogoutUserRequestPayload, LogoutUserSuccessPayload, Error>();

export const todoUserAction = createAsyncAction(
    TODO_REQUEST,
    TODO_SUCCESS,
    TODO_FAILURE
)<TodoUserRequestPayload, TodoUserSuccessPayload, Error>();

export const patchUserAction = createAsyncAction(
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILURE
)<PatchUserRequestPayload, PatchUserSuccessPayload, Error>();

export const todoPostAction = createAsyncAction(
    TODO_CREATE_REQUEST,
    TODO_CREATE_SUCCESS,
    TODO_CREATE_FAILURE,
)<TodoPostRequestPayload, TodoUserSuccessPayload, Error>();

export const todoPatchAction = createAsyncAction(
    TODO_PATCH_REQUEST,
    TODO_PATCH_SUCCESS,
    TODO_PATCH_FAILURE
)<TodoPatchRequestPayload, TodoUserSuccessPayload, Error>();

export const todoDeleteAction = createAsyncAction(
    TODO_DELETE_REQUEST,
    TODO_DELETE_SUCCESS,
    TODO_DELETE_FAILURE
)<TodoDeleteRequestPayload, TodoUserSuccessPayload, Error>();