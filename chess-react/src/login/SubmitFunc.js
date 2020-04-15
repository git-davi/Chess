import axios from 'axios';

export function loginSubmit(event) {
    event.preventDefault();

    axios.post('/auth', {
            username: event.target.username.value,
            password: event.target.password.value
    })
    .then((res) => {
        if (res.data.error !== undefined)
            setError(res.data.error);
        else
            console.log(res);
    }, (err) => {
        console.log(err);
    });
}

export function validateForm(event, setError, setSuccess) {
    event.preventDefault();

    if (passRef.current.value !== validPassRef.current.value) {
        setError('Passwords must be equal');
        return;
    }
    
    axios.post('/auth/register', {
        username: event.target.username.value,
        password: event.target.password.value,
        email: event.target.email.value
    })
    .then((res) => {
        if (res.data.error !== undefined) {
            setError(res.data.error);
            setSuccess(false);
        }
        else if (res.data.success !== undefined) {
            setSuccess(true);
            setError(null);
        }
    }, (err) => {
        console.log(err);
    });
}