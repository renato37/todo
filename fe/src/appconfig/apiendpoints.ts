import {API_URL} from './env';

const endpoints = {
    register: `${API_URL}/register`,
    login: `${API_URL}/login`,
    logout: `${API_URL}/logout`,
    todo: `${API_URL}/todos`,
    user: `${API_URL}/user`
}

export default endpoints;
