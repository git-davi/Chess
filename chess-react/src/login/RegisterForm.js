import React, { useRef } from 'react';

import Input from './Input';


export default function RegisterForm() {

    const passRef = useRef();
    const validPassRef = useRef();

    return (
        <>
            <Input id="reg-email" type="email" name="email" label="Email" placeholder="Enter Username"/>
            <Input id="reg-user" type="text" name="username" label="Username" placeholder="Enter Username"/>
            <Input id="reg-pass-1" innerRef={passRef} name="password" type="password" label="Password" placeholder="Enter Password"/>
            <Input  id="reg-pass-2"
                    innerRef={validPassRef}
                    type="password" 
                    label="Repeat Password" 
                    placeholder="Enter Password Again"
                />
            
            
        </>
    );
}