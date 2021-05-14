
import axios, { AxiosRequestConfig } from 'axios';
import {
    put,
    call,
    take,
    fork,
    select,
} from 'redux-saga/effects';
import { ActionMeta } from 'redux-actions';
import { tokenSelector } from '../user/selectors';
import { API_URL } from '../../appconfig/env';

type Action = Generator<unknown, unknown, ActionMeta<any, any>>;
const SUCCESS_TYPE = "@@api-request/SUCCESS";
const ERROR_TYPE = "@@api-request/ERROR";

let requestID = 0;

// Cache-Control and Pragma headers are necessary for IE11 cache
export const api = axios.create({
    baseURL: API_URL
});


function* apiRequest(request: AxiosRequestConfig, ID: number): Generator {
    const source = axios.CancelToken.source();
    try {
        const token = yield select(tokenSelector);
        const response = (
            yield call(api.request, {
                ...request,
                cancelToken: source.token,
                headers: {
                    ...request.headers,
                    Authorization: "Bearer " + token,
                },
            })
        ) as { data: unknown };

        yield put({
            type: SUCCESS_TYPE,
            meta: {
                ID,
            },
            payload: {
                data: response?.data,
            },
        });
    } catch (error) {
        yield put({
            type: ERROR_TYPE,
            meta: {
                ID,
            },
            payload: {
                error
            },
        });
    } finally {
        source.cancel();
    }
}

function* apiCallSaga(
    url: string,
    req: AxiosRequestConfig,
    needAuthorization = true,
): Action {
    try {
        const request = { ...req, url };

        if (needAuthorization) {
            request.withCredentials = true;
        }

        requestID += 1;
        const thisRequestID = requestID;

        yield fork(apiRequest, request, thisRequestID);

        while (true) {
            const action = yield take([SUCCESS_TYPE, ERROR_TYPE]);

            if (action?.meta.ID === thisRequestID) {
                if(action.type === SUCCESS_TYPE){
                    return action.payload.data;
                }
                throw new Error(action.payload.error?.response?.data?.message ?? "Unknown server error");
            }
        }
    } catch (err){
        throw err;
    }
}

const getRequest = (
    url: string,
    options?: AxiosRequestConfig,
    needAuthorization?: boolean,
): Action => apiCallSaga(
    url, {
        ...options,
        method: 'get',
    },
    needAuthorization,
);

const postRequest = (
    url: string,
    options?: AxiosRequestConfig,
    needAuthorization?: boolean,
): Action => apiCallSaga(
    url, {
        ...options,
        method: 'post',
    },
    needAuthorization,
);

const patchRequest = (
    url: string,
    options?: AxiosRequestConfig,
    needAuthorization?: boolean,
): Action => apiCallSaga(
    url, {
        ...options,
        method: 'patch',
    },
    needAuthorization,
);

const deleteRequest = (
    url: string,
    options?: AxiosRequestConfig,
    needAuthorization?: boolean,
): Action => apiCallSaga(
    url, {
        ...options,
        method: 'delete',
    },
    needAuthorization,
);
const apiMethods = {
    get: getRequest,
    post: postRequest,
    patch: patchRequest,
    delete: deleteRequest,
};

export default apiMethods;