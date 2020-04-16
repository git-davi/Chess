import React, { useContext } from 'react';

import Logout from './Logout';
import {AuthContext} from '../App';
import {axiosAuthWrapper as axiosWrap} from './axiosAuthWrapper';


export default function Game() {

    const context = useContext(AuthContext);

    function testApi() {

        axiosWrap({
            method: 'get',
            url: '/game',
            setAuth: context.setAuth
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    return (
        <div className="container">
            <Logout  />
            <button className="btn btn-primary" onClick={testApi}>testApi</button>
        </div>
    );
}