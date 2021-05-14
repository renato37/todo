import { 
    registerUserAction,
    loginUserAction, 
    logoutUserAction,
    todoUserAction,
    patchUserAction,
    todoPostAction,
    todoPatchAction,
    todoDeleteAction
} from './actions';
import { ActionType } from 'typesafe-actions';

export interface RegisterUserRequestPayload {
    username: string;
    password: string;
    email: string;
}

export interface LoginUserRequestPayload {
    username: string;
    password: string;
}

export interface LoginUserSuccessPayload {
    accessToken: string;
    username: string;
}

export interface LogoutUserSuccessPayload{
    accessToken: string;
}

export interface LogoutUserRequestPayload{
}

export interface LogoutUserSuccessPayload{
    accessToken: string;
}

export interface TodoUserSuccessPayload{
    todos: todo[];
}

export interface TodoUserRequestPayload{
}

export interface PatchUserSuccessPayload {
}

export interface PatchUserRequestPayload {
    password: string;
}

export interface TodoPostRequestPayload{
    task: string;
}

export interface TodoPatchRequestPayload{
    id: number,
    task: string;
    isCompleted: boolean;
}

export interface TodoDeleteRequestPayload{
    id: number
}

export interface todo{
    id:number;
    username:string;
    task:string;
    isCompleted:boolean;
    date:Date;
}

export interface UserState {
    errorMessage?: string;
    auth?: {
        accessToken: string;
    }
    username?: string;
    todos?: todo[]; 
}

export type Actions = ActionType<typeof registerUserAction 
                                | typeof loginUserAction 
                                | typeof logoutUserAction
                                | typeof todoUserAction
                                | typeof patchUserAction
                                | typeof todoPostAction
                                | typeof todoDeleteAction
                                | typeof todoPatchAction>;