import React, { useRef, useState } from 'react';
import Input from './Input';
import ButtonBar from './ButtonBar';


export default function RegisterForm({ setRegistration, registration }) {
    
    const [ valid, setValid ] = useState(true);

    const passRef = useRef();
    const validPassRef = useRef();

    function validateForm(e) {
        if (passRef.current.value !== validPassRef.current.value) {
            e.preventDefault();
            setValid(false);
        }
    }

    return (
        <form action="/auth/register" onSubmit={validateForm}>
            <Input id={"reg-email"} type={"email"} label="Email" placeholder={"Enter Username"}/>
            <Input id={"reg-user"} type={"text"} label="Username" placeholder={"Enter Username"}/>
            <Input id={"reg-pass-1"} innerRef={passRef} type={"password"} label="Password" placeholder={"Enter Password"}/>
            <Input  id={"reg-pass-2"}
                    innerRef={validPassRef}
                    type={"password"} 
                    label="Repeat Password" 
                    placeholder={"Enter Password Again"}
                />
            { valid ? null 
            : <div className="alert alert-danger" role="alert">Passwords must be equal</div> }
            <ButtonBar  setRegistration={setRegistration}
                registration={registration}
            />
        </form>
    );
}