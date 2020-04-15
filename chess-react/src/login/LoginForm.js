import React from 'react';
import Input from './Input';


export default function LoginForm() {

    return (
        <>
            <Input id="log-user" type="text" name="username" label="Username" placeholder="Enter Username"/>
            <Input id="log-pass" type="password" name="password" label="Password" placeholder="Enter Password"/>
        </>
    );
}