import React from 'react';

export default function Input({type, label="", placeholder=""}) {
    return (
        <div className="form-group">
            <label className="mr-2">{label}</label>
            <input type={type} placeholder={placeholder}/>
        </div>
    );
}