import React from 'react';

function ButtonBarLogin({ changeForm }) {
    return (
        <>
            <div className="col">
                <button className="btn btn-primary btn-block btn-lg mt-1" type="submit">Login</button>
            </div> 
            <div className="col">
                <button className="btn btn-secondary btn-block btn-lg mt-1" 
                        type="button" 
                        onClick={changeForm}
                >Register</button>
            </div>
        </>
    );
}

function ButtonBarRegistration({ changeForm }) {
    return (
        <>
            <div className="col">
                <button className="btn btn-secondary btn-block btn-lg mt-1" 
                        type="button"
                        onClick={changeForm}        
                >Login</button>
            </div>
            <div className="col">
                <button className="btn btn-primary btn-block btn-lg mt-1" type="submit" >Register</button>
            </div>
        </>
    );
}


export default function ButtonBar({ changeForm, form }) {

    return (
        <div className="row mt-5">
            { form === 'login' 
                ? <ButtonBarLogin changeForm={changeForm}/>
                : <ButtonBarRegistration changeForm={changeForm}/> 
            }
        </div>
    );
}