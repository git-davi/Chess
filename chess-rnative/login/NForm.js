import React, { useState, useRef, useContext } from 'react';

import ButtonBar from './ButtonBar';
import Alert from './Alert';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { validateForm, loginSubmit } from './util/submitFunc';
import {AuthContext} from '../App'; 

import { Form, Text, View } from 'native-base';


export default function nForm() {

    const passRef = useRef();
    const validPassRef = useRef();

    const [form, setForm] = useState('login');
    const [response, setResponse] = useState({ status: null, message: null });

    const context = useContext(AuthContext);

    function login() {
        //loginSubmit(event, setResponse, context.setAuth);
    }

    function register() {
        //validateForm(event, setResponse, context.setAuth, passRef, validPassRef);
    }

    function changeForm() {
        if (form === 'login') {
            setForm('registration');
        } else {
            setForm('login');
        }

    }

    return (
        <View>
            <Text>{form === 'login' ? 'Sign In' : 'Sign Up'}</Text>
            <Form>
                { form === 'login' ? 
                    <LoginForm/> : 
                    <RegisterForm 
                    passRef={passRef} validPassRef={validPassRef}/> }
                <Alert response={response} />
                <ButtonBar  
                    changeForm={changeForm}
                    form={ form } 
                    action={form === 'login' ? login : register}/>
            </Form>
        </View>
    );
}