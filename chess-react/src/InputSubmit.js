import React from 'react';

export default function InputSubmit({ value }) {
    return (
        <input className="btn btn-primary" type="submit" value={value} />
    );
}