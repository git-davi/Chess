import React, { useContext } from 'react';

import {AuthContext} from '../App';
import {UserContext} from './Game';
import {TOKEN_KEY} from '../storageKeys';


export default function NavBar() {

    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        authContext.setAuth(false);
    }

    return (
        <div className="d-flex mt-2">
                <div className="badge badge-warning mr-2 text-wrap">{userContext.user.username}</div>
                <div className="badge badge-warning mr-auto text-wrap">{userContext.user.elo}</div>
                <button className="btn btn-danger" onClick={logout}>Logout &times;</button>
        </div>
    );
}