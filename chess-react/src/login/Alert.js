import React from 'react';


export default function Alert({ response }) {

    return (
        <>
        { response.type !== null && 
            <div className={"alert alert-" +  (response.type === 'error' ? 'danger' : 'success')} role="alert">
                {response.value}
            </div> }
        </>
    );
}