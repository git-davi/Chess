import axios from 'axios';


function request(url, data, setResponse) {
    axios.post(url, data)
    .then((res) => {
        setResponse(res.data);
    }, (err) => {
        console.log(err);
    })
}


export function loginSubmit(event, setResponse) {
    event.preventDefault();

    request('/auth', {
        username: event.target.username.value,
        password: event.target.password.value
        }, setResponse);
}


export function validateForm(event, setResponse, passRef, validPassRef) {
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
    }, setResponse);
}