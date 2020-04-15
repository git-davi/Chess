import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ButtonBar from './ButtonBar';
import { validateForm, loginSubmit } from './SubmitFunc';


export default function Form() {

    const [form, setForm] = useState('login');
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [redirect, setRedirect] = useState();

    // da rifare l'interfaccia con il server e la redirection
    function login(event) {
        console.log('login')
    }

    function register(event) {
        console.log('register')
    }

    function changeForm() {
        if (form === 'login') {
            setForm('registration');
        } else {
            setForm('login');
        }

    }

    if (redirect)
        return ( <Redirect to={ redirect } /> );

    return (
        <div className="row justify-content-center">
                <div className="jumbotron col-5" >
                    <form onSubmit={form === 'login' ? login : register}>
                        { form === 'login' ? <LoginForm /> : <RegisterForm /> }
                        { error && <div className="alert alert-danger" role="alert">{error}</div> }
                        { success && <div className="alert alert-success" role="alert">{success}</div> }
                        <ButtonBar  changeForm={changeForm} form={ form }/>
                    </form>
                </div>
        </div>
    );
}