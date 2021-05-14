import {ApplicationState} from '../types';

export const tokenSelector = (state: ApplicationState): string | undefined => state.user.auth?.accessToken;