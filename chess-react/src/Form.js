import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


export default function Form() {

    const [registration, setRegistration] = useState(false)

    return (
        <div className="mt-5" >
            { !registration 
            ? <LoginForm setRegistration={setRegistration} registration={registration} />
            : <RegisterForm setRegistration={setRegistration} registration={registration} />
            }
        </div>
    );
}