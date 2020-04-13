import React from 'react';
import Input from './Input';
import ButtonBar from './ButtonBar';


export default function LoginForm({ setRegistration, registration }) {
    return (
        <form action="/auth">
            <Input id={"log-user"} type={"text"} label="Username" placeholder={"Enter Username"}/>
            <Input id={"log-pass"} type={"password"} label="Password" placeholder={"Enter Password"}/>
            <ButtonBar  setRegistration={setRegistration}
                        registration={registration}
                        />
        </form>

    );
}