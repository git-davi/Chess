import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ButtonBar from './ButtonBar';
import Alert from './Alert';
import { validateForm, loginSubmit } from './SubmitFunc';


export default function Form() {

    const passRef = useRef();
    const validPassRef = useRef();

    const [form, setForm] = useState('login');
    const [response, setResponse] = useState({ type: null, value: null });

    function login(event) {
        loginSubmit(event, setResponse);
    }

    function register(event) {
        validateForm(event, setResponse, passRef, validPassRef);
    }

    function changeForm() {
        if (form === 'login') {
            setForm('registration');
        } else {
            setForm('login');
        }

    }

    // come fare il login middleware che si attiva dopo un success tra registrazione e login
    if (false)
        return ( <Redirect to='/game' /> );

    return (
        <div className="row justify-content-center">
                <div className="jumbotron col-5" >
                    <form onSubmit={form === 'login' ? login : register}>
                        { form === 'login' ? <LoginForm /> : <RegisterForm passRef={passRef} validPassRef={validPassRef} /> }
                        <Alert response={response} />
                        <ButtonBar  changeForm={changeForm} form={ form }/>
                    </form>
                </div>
        </div>
    );
}