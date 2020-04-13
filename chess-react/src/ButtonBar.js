import React from 'react';


export default function ButtonBar({ setRegistration, registration }) {

    function renderForm() {
        setRegistration(!registration);
    }

    function buttonBarLogin() {
        return (
            <>
                <div className="container col">
                    <button className="btn btn-primary btn-block btn-lg" type="submit">Login</button>
                </div>
                <div className="container col">
                    <button className="btn btn-secondary btn-block btn-lg" 
                            type="button" 
                            onClick={renderForm}
                    >Register</button>
                </div>
            </>
        );
    }

    function buttonBarRegistration() {
        return (
            <>
                <div className="container col">
                    <button className="btn btn-secondary btn-block btn-lg" 
                            type="button"
                            onClick={renderForm}        
                    >Login</button>
                </div>
                <div className="container col">
                <button className="btn btn-primary btn-block btn-lg" type="submit" >Register</button>
                </div>
            </>
        );
    }

    return (
        <div className="row mt-5">
            {registration 
                ? buttonBarRegistration() 
                : buttonBarLogin()
            }
        </div>
    );
}