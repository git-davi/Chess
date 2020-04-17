import React, { useContext, useState, useEffect } from 'react';

import {AuthContext} from '../App';
import {TOKEN_KEY} from '../storageKeys';
import {axiosAuthWrapper as axiosAW} from './util/axiosAuthWrapper';
import parseJwt from './util/parseJwt';


export default function NavBar() {

    const authContext = useContext(AuthContext);
    
    const token = localStorage.getItem(TOKEN_KEY);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        axiosAW({
            method: 'get',
            url: '/game/user/'+parseJwt(token).username,
        }, authContext)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.log(err));
    }, [token, authContext]);

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        authContext.setAuth(false);
    }

    return (
        <div className="d-flex mt-2">
                <div className="badge badge-warning mr-2 text-wrap">{userInfo.username}</div>
                <div className="badge badge-warning mr-auto text-wrap">{userInfo.elo}</div>
                <button className="btn btn-danger" onClick={logout}>Logout &times;</button>
        </div>
    );
}