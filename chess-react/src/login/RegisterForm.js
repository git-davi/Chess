import React, { useRef, useState } from 'react';
import axios from 'axios';

import Input from './Input';


export default function RegisterForm({ passRef, validPassRef }) {

    const [valid, setValid] = useState();
    const userRef = useRef();

    function checkUsername() {
        axios.get("/auth/users/"+userRef.current.value)
        .then((res) => setValid('border border-danger')) 
        .catch((err) => setValid('border border-success'));
    }


    return (
        <>
            <Input id="reg-email" type="email" name="email" label="Email" placeholder="Enter Username"/>
            <div className="form-group">
                <label htmlFor="reg-user">Username</label>
                <input  ref={userRef}
                        id="reg-user" 
                        name="username" 
                        className={"form-control " + valid } 
                        type="text" 
                        placeholder="Enter Username" 
                        onChange={checkUsername}
                        required/>
            </div>
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