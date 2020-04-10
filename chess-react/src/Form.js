import React, { useState } from 'react';
import Input from './Input';
import InputSubmit from './InputSubmit';

export default function HomeForm() {

    const [registration, setRegistration] = useState(false)

    return (
        <div className="d-flex justify-content-center mt-5">
            <form>
                <Input type={"text"} label="Username :" placeholder={"Enter Username"}/>
                <Input type={"password"} label="Password :" placeholder={"Enter Password"}/>
                <div className="container">
                    <input className="btn btn-primary" type="submit" value="Login" />
                    <button type="button" class="btn btn-secondary">Register</button>
                </div>
            </form>
        </div>
    );
}