import React, { useContext, useState, useEffect } from 'react';

import Logout from './Logout';

import {AuthContext} from '../App';
import {axiosAuthWrapper as axiosAW} from './util/axiosAuthWrapper';
import parseJwt from './util/parseJwt';
import TOKEN_KEY from '../token';

export default function Game() {

    const token = localStorage.getItem(TOKEN_KEY);
    const context = useContext(AuthContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        axiosAW({
            method: 'get',
            url: '/game/user/'+parseJwt(token).username,
        }, () => context.setAuth(false))
        .then((res) => setUser(res.data))
    }, [token, context]);


    function testApi() {

        axiosAW({
            method: 'get',
            url: '/game/user/'+parseJwt(token).username,
        }, () => context.setAuth(false))
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    }


    return (
        <div className="container">
            <div className="d-flex mt-2">
                <div className="badge badge-warning mr-auto">{user.username} : {user.elo}</div>
                <Logout  />
            </div>
            <button className="btn btn-primary mt-5" onClick={testApi}>testApi</button>
        </div>
    );
}