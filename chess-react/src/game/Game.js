import React, { useContext } from 'react';

import Logout from './Logout';
import {AuthContext} from '../App';
import {axiosAuthWrapper as axiosAW} from './axiosAuthWrapper';


export default function Game() {

    const context = useContext(AuthContext);

    function testApi() {

        axiosAW({
            method: 'get',
            url: '/game',
        }, () => context.setAuth(false))
        .then((res) => console.log(res.status))
        .catch((err) => console.log(err.response.status));
    }

    return (
        <div className="container">
            <Logout  />
            <button className="btn btn-primary" onClick={testApi}>testApi</button>
        </div>
    );
}