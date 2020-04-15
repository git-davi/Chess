import axios from 'axios';
import TOKEN_KEY from '../token';


function request(url, data, setResponse, setAuth) {
    axios.post(url, data)
    .then((res) => {
        setResponse(res.data);
        if (res.data.token !== undefined) {
            localStorage.setItem(TOKEN_KEY, res.data.token);
            setAuth(true);
        }

    }, (err) => {
        console.log(err);
    })
}


export function loginSubmit(event, setResponse, setAuth) {
    event.preventDefault();

    request('/auth', {
        username: event.target.username.value,
        password: event.target.password.value
        }, setResponse, setAuth);
}


export function validateForm(event, setResponse, setAuth, passRef, validPassRef) {
    event.preventDefault();

    if (passRef.current.value !== validPassRef.current.value) {
        setResponse({
            type: 'error',
            value: 'Passwords must be equal'
        });
        return;
    }
    
    request('/auth/register', {
        username: event.target.username.value,
        password: event.target.password.value,
        email: event.target.email.value
    }, setResponse, setAuth);
}