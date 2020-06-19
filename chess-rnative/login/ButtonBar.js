import React from 'react';

function ButtonBarLogin({ changeForm }) {
    return (
        <>
            <div className="col">
                <button className="btn btn-primary btn-block btn-lg mt-1" type="submit">
                    Login
                    <svg className="bi bi-box-arrow-in-right ml-2" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.146 11.354a.5.5 0 010-.708L10.793 8 8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M1 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 011 8z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M13.5 14.5A1.5 1.5 0 0015 13V3a1.5 1.5 0 00-1.5-1.5h-8A1.5 1.5 0 004 3v1.5a.5.5 0 001 0V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-8A.5.5 0 015 13v-1.5a.5.5 0 00-1 0V13a1.5 1.5 0 001.5 1.5h8z" clipRule="evenodd"/>
                    </svg>
                </button>
            </div> 
            <div className="col">
                <button className="btn btn-secondary btn-block btn-lg mt-1" 
                        type="button" 
                        onClick={changeForm}>Register</button>
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
                        onClick={changeForm}>Login</button>
            </div>
            <div className="col">
                <button className="btn btn-primary btn-block btn-lg mt-1" type="submit" >
                    Register&nbsp;
                    <svg className="bi bi-archive ml-2" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2 5v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V5h1v7.5c0 1.345-1.021 2.5-2.357 2.5H3.357C2.021 15 1 13.845 1 12.5V5h1z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M5.5 7.5A.5.5 0 016 7h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM15 2H1v2h14V2zM1 1a1 1 0 00-1 1v2a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1H1z" clipRule="evenodd"/>
                    </svg>
                </button>
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