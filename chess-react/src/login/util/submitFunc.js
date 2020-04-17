import axios from 'axios';
import {TOKEN_KEY} from '../../storageKeys';


function request(url, data, setResponse, setAuth) {
    axios.post(url, data)
    .then((res) => {
        setResponse({
            status: res.status,
            message: res.data.message
        });
        localStorage.setItem(TOKEN_KEY, res.data.token);
        setAuth(true);
    })
    .catch((err) => {
        setResponse({
            status: err.response.status,
            message: err.response.data.message
        });
    });
}


export function loginSubmit(event, setResponse, setAuth) {
    event.preventDefault();

    request('/auth/login', {
        username: event.target.username.value,
        password: event.target.password.value
        }, setResponse, setAuth);
}


export function validateForm(event, setResponse, setAuth, passRef, validPassRef) {
    event.preventDefault();

    if (passRef.current.value !== validPassRef.current.value) {
        setResponse({
            status: '412',
            message: 'Passwords must be equal'
        });
        return;
    }
    
    request('/auth/register', {
        username: event.target.username.value,
        password: event.target.password.value,
        email: event.target.email.value
    }, setResponse, setAuth);
}