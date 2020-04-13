import React from 'react';

export default function Input({
    id,
    type, 
    label=null, 
    placeholder=null, 
    innerRef=null}) {

        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input id={id} className="form-control" ref={innerRef} type={type} placeholder={placeholder} required/>
            </div>
        );
}