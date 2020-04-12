import React from 'react';


export default function ButtonBar({ setRegistration, registration }) {

    function renderForm() {
        setRegistration(!registration);
    }

    if (registration) {
        return (
            <div className="container">
                <button className="btn btn-secondary" 
                        type="button"
                        onClick={renderForm}        
                >Login</button>
                <button className="btn btn-primary" type="submit" >Register</button>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <button className="btn btn-primary" type="submit">Login</button>
                <button className="btn btn-secondary" 
                        type="button" 
                        onClick={renderForm}
                >Register</button>
            </div>
        );
    }

    
}