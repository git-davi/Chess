import React, { useState, useRef, useContext } from 'react';

import ButtonBar from './ButtonBar';
import Alert from './Alert';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { validateForm, loginSubmit } from './util/submitFunc';
import {AuthContext} from '../App'; 


export default function Form() {

    const passRef = useRef();
    const validPassRef = useRef();

    const [form, setForm] = useState('login');
    const [response, setResponse] = useState({ status: null, message: null });

    const context = useContext(AuthContext);

    function login(event) {
        loginSubmit(event, setResponse, context.setAuth);
    }

    function register(event) {
        validateForm(event, setResponse, context.setAuth, passRef, validPassRef);
    }

    function changeForm() {
        if (form === 'login') {
            setForm('registration');
        } else {
            setForm('login');
        }

    }

    return (
        <div className="row justify-content-center">
            <div className="card  col-5 bg-light" >
                <div className="card-body" >
                    <h4 className="card-title">{form === 'login' ? 'Sign In' : 'Sign Up'}</h4>
                    <form onSubmit={form === 'login' ? login : register}>
                        { form === 'login' ? <LoginForm /> : <RegisterForm passRef={passRef} validPassRef={validPassRef} /> }
                        <Alert response={response} />
                        <ButtonBar  changeForm={changeForm} form={ form }/>
                    </form>
                </div>
            </div>
        </div>
    );
}