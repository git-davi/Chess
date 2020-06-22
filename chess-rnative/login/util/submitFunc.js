import axios from 'axios';
import {TOKEN_KEY} from '../../storageKeys';
import { AsyncStorage } from 'react-native';


function request(url, server, data, setResponse, setAuth, setServer) {
    axios.post(url, data)
    .then(async (res) => {
        setResponse({
            status: res.status,
            message: res.data.message
        });

        await AsyncStorage.setItem(TOKEN_KEY, res.data.token);
        await AsyncStorage.setItem("server", server);
        setAuth(res.data.token);
        setServer(server);
    })
    .catch((err) => {
        setResponse({
            status: err.response.status,
            message: err.response.data.message
        });
    });
}


export function loginSubmit(data, setResponse, setAuth, setServer) {

    if (!data.server || !data.username || !data.password) {
        setResponse({
            status: 500,
            message: 'Missing some fields'
        });
        return;
    }

    request(data.server + '/auth/login', data.server, {
        username: data.username,
        password: data.password
        }, setResponse, setAuth, setServer);
}


export function registerSubmit(data, setResponse, setAuth, setServer) {

    if (!data.server || !data.mail || !data.username || !data.password || !data.validpassword) {
        setResponse({
            status: 500,
            message: 'Missing some fields'
        });
        return;
    }   

    if (data.password !== data.validpassword) {
        setResponse({
            status: '412',
            message: 'Passwords must be equal'
        });
        return;
    }
    
    request(data.server + '/auth/register', data.server, {
        username: data.username,
        password: data.password,
        email: data.email
    }, setResponse, setAuth, setServer);
}