import React from 'react';

import Logout from './Logout';
import TOKEN_KEY from '../token';

import axios from 'axios';

export default function Game() {

    function testApi() {
        axios.get("/game", {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem(TOKEN_KEY) 
            }
        })
        .then((res) => console.log(res), 
            (res) => console.log(res));
    }

    return (
        <div className="container">
            <Logout  />
            <button className="btn btn-primary" onClick={testApi}>testApi</button>
        </div>
    );
}