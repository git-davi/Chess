import React from 'react';

export default function Input({
    type, 
    label=null, 
    placeholder=null, 
    innerRef=null}) {

        return (
            <div className="form-group">
                <label className="mr-2">{label}</label>
                <input ref={innerRef} type={type} placeholder={placeholder} required/>
            </div>
        );
}