import React, { useState, useRef, useContext } from 'react';

import ButtonBar from './ButtonBar';
import Alert from './Alert';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { registerSubmit, loginSubmit } from './util/submitFunc';
import {AuthContext} from '../App'; 

import { Form, Text, View } from 'native-base';


export default function nForm() {

    const passRef = useRef();
    const validPassRef = useRef();

    const [form, setForm] = useState('login');
    const [response, setResponse] = useState({ status: null, message: null });
    const [data, setData] = useState({});

    const context = useContext(AuthContext);

    function login() {
        loginSubmit(data, setResponse, context.setAuth, context.setServer);
    }

    function register() {
        registerSubmit(data, setResponse, context.setAuth, context.setServer);
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
                    <LoginForm data={data} setData={setData}/> : 
                    <RegisterForm data={data} setData={setData}/> }
                <Alert response={response} />
                <ButtonBar  
                    changeForm={changeForm}
                    form={ form } 
                    action={form === 'login' ? login : register}/>
            </Form>
        </View>
    );
}