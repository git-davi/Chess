import axios from 'axios';
import {TOKEN_KEY} from '../../storageKeys';
import logout from './logout';

export function axiosAuthWrapper(config, authContext) {
    config.headers = config.headers || {};
    config.headers.Authorization = 'Bearer ' + localStorage.getItem(TOKEN_KEY);

    return axios(config).catch((err) => {
        if (err.response !== undefined && err.response.status === 401) 
            logout(authContext, TOKEN_KEY);
        throw err;
    });
}