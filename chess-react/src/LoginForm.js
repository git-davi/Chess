import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import ButtonBar from './ButtonBar';


export default function LoginForm({ setRegistration, registration }) {
    
    const [error, setError] = useState(null);

    function loginSubmit(event) {
        event.preventDefault();
        
        axios.post('/auth', {
            username: event.target.username.value,
            password: event.target.password.value
        })
        .then((res) => {
            if (res.data.error !== undefined)
                setError(res.data.error);
            /*
            How to handle redirection now ?
            React-router ?
            */
        }, (err) => {
            console.log(err);
        });
    }
    
    return (
        <form onSubmit={loginSubmit}>
            <Input id="log-user" type="text" name="username" label="Username" placeholder="Enter Username"/>
            <Input id="log-pass" type="password" name="password" label="Password" placeholder="Enter Password"/>
            {error && <div className="alert alert-danger" role="alert">{error}</div> }
            <ButtonBar  setRegistration={setRegistration}
                        registration={registration}
                        />
        </form>

    );
}