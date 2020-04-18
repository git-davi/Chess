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
        let mounted = true;
        axiosAW({
            method: 'get',
            url: '/game/user/'+parseJwt(token).username,
        }, authContext)
        .then((res) => mounted ? setUserInfo(res.data) : null)
        .catch((err) => console.log(err));

        return () => mounted = false;
    }, [token, authContext]);

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        authContext.setAuth(false);
    }

    return (
        <div className="container d-flex flex-wrap mt-2">
                <h2 className="mr-2"><span className="badge badge-warning text-wrap">{userInfo.username}</span></h2>
                <h2><span className="badge badge-info text-wrap">{userInfo.elo}</span></h2>
                <button className="btn btn-danger ml-auto" onClick={logout}>
                    Logout
                    <svg className="bi bi-box-arrow-right ml-2" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M11.646 11.354a.5.5 0 010-.708L14.293 8l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M2 13.5A1.5 1.5 0 01.5 12V4A1.5 1.5 0 012 2.5h7A1.5 1.5 0 0110.5 4v1.5a.5.5 0 01-1 0V4a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V12A1.5 1.5 0 019 13.5H2z" clipRule="evenodd"/>
                    </svg>
                </button>
        </div>
    );
}