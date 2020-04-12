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
            <Input type={"email"} label="Email :" placeholder={"Enter Username"}/>
            <Input type={"text"} label="Username :" placeholder={"Enter Username"}/>
            <Input innerRef={passRef} type={"password"} label="Password :" placeholder={"Enter Password"}/>
            <Input  innerRef={validPassRef}
                    type={"password"} 
                    label="Repeat Password :" 
                    placeholder={"Enter Password"}
                />
            { valid ? null 
            : <div className="alert alert-danger" role="alert">Passwords must be equals</div> }
            <ButtonBar  setRegistration={setRegistration}
                registration={registration}
            />
        </form>
    );
}