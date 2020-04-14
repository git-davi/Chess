import React, { useRef, useState } from 'react';
import axios from 'axios';

import Input from './Input';
import ButtonBar from './ButtonBar';


export default function RegisterForm({ setRegistration, registration }) {
    
   const [ error, setError ] = useState(null);
   const [ success, setSuccess ] = useState(false);

    const passRef = useRef();
    const validPassRef = useRef();

    function validateForm(event) {
        event.preventDefault();

        if (passRef.current.value !== validPassRef.current.value) {
            setError('Passwords must be equal');
            return;
        }

        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
            email: event.target.email.value
        };

        axios.post('/auth/register', data )
        .then((res) => {
            if (res.data.error !== undefined)
                setError(res.data.error);
            else if (res.data.success !== undefined) {
                setSuccess(true);
                setTimeout(() => {
                    setRegistration(false);
                }, 3000);
            }
        }, (err) => {
            console.log(err);
        });
    }

    return (
        <form onSubmit={validateForm}>
            <Input id="reg-email" type="email" name="email" label="Email" placeholder="Enter Username"/>
            <Input id="reg-user" type="text" name="username" label="Username" placeholder="Enter Username"/>
            <Input id="reg-pass-1" innerRef={passRef} name="password" type="password" label="Password" placeholder="Enter Password"/>
            <Input  id="reg-pass-2"
                    innerRef={validPassRef}
                    type="password" 
                    label="Repeat Password" 
                    placeholder="Enter Password Again"
                />
            { error && <div className="alert alert-danger" role="alert">{error}</div> }
            { success && <div className="alert alert-success" role="alert">Success! Redirection to login...</div> }
            <ButtonBar  setRegistration={setRegistration}
                registration={registration}
            />
        </form>
    );
}