import axios from 'axios';
import {TOKEN_KEY} from '../../storageKeys';
import logout from './logout';

export async function axiosAuthWrapper(config, authContext) {
    config.headers = config.headers || {};
    config.headers.Authorization = 'Bearer ' + authContext.auth;

    //console.log("Do I have token? " + authContext.auth);
    //console.log("Do I have server? " + authContext.server);
    config.url = authContext.server + config.url;

    return axios(config).catch((err) => {
        if (err.response !== undefined && err.response.status === 401) 
            logout(authContext, TOKEN_KEY);
        throw err;
    });
}