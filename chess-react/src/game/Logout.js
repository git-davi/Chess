import React, { useContext } from 'react';

import { AuthContext } from '../App';
import TOKEN_KEY from '../token';


export default function LogoutButton() {

    const context = useContext(AuthContext);


    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        context.setAuth(false);
    }


    return (
        <button className="btn btn-danger" onClick={logout}>Logout &times;</button>
    );
}