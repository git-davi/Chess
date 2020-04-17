import React, { useContext, useState, useEffect, createContext } from 'react';

import NavBar from './NavBar';
import GamesHandler from './GamesHandler';

import {AuthContext} from '../App';
import {axiosAuthWrapper as axiosAW} from './util/axiosAuthWrapper';
import parseJwt from './util/parseJwt';
import {TOKEN_KEY} from '../storageKeys';


export const UserContext = createContext();

export default function Game() {

    const authContext = useContext(AuthContext);
    const token = localStorage.getItem(TOKEN_KEY);

    const [user, setUser] = useState({});

    useEffect(() => {
        axiosAW({
            method: 'get',
            url: '/game/user/'+parseJwt(token).username,
        }, () => authContext.setAuth(false))
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    // testing
    /*
    const token = localStorage.getItem(TOKEN_KEY);
    const context = useContext(AuthContext);

    function testApi() {

        axiosAW({
            method: 'get',
            url: '/game/user/'+user.username,
        }, () => context.setAuth(false))
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    }
    */
    // testing
    var testApi = () => {};


    return (
        <UserContext.Provider value={{ user: user, setUser: setUser}}>
            <div className="container">
                <NavBar />
                <GamesHandler />
                <button className="btn btn-primary mt-5" onClick={testApi}>testApi</button>
            </div>
        </UserContext.Provider>
    );
}