import React from 'react';


export default function ButtonBar({ setRegistration, registration }) {

    function renderForm() {
        setRegistration(!registration);
    }

    function buttonBarLogin() {
        return (
            <>
                <div className="col">
                    <button className="btn btn-primary btn-block btn-lg mt-1" type="submit">Login</button>
                </div> 
                <div className="col">
                    <button className="btn btn-secondary btn-block btn-lg mt-1" 
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
                <div className="col">
                    <button className="btn btn-secondary btn-block btn-lg mt-1" 
                            type="button"
                            onClick={renderForm}        
                    >Login</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-block btn-lg mt-1" type="submit" >Register</button>
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