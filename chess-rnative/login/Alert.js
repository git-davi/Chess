import React from 'react';


export default function Alert({ response }) {

    return (
        <>
        { response.status !== null && 
            <div className={"alert alert-" +  (response.status > 201 ? 'danger' : 'success')} role="alert">
                {response.message}
            </div> }
        </>
    );
}