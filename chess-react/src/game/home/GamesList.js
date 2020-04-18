import React, { useContext, useEffect, useState } from 'react';

import GameItem from './GameItem';

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';


export default function GamesList({games, setGames}) {

    const authContext = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        let mounted = true;
        axiosAW({
            method: 'get',
            url: '/game/games',
        }, authContext)
        .then((res) => mounted ? setGames(res.data.games) : null)
        .catch((err) => console.log(err.response));

        return () => mounted = false;
    }, [authContext, setGames]);


    useEffect(() => {
        let mounted = true;
        if (!refresh) return () => mounted = false;
        
        axiosAW({
            method: 'get',
            url: '/game/games',
        }, authContext)
        .then((res) => {
            if(!mounted) return;
            setRefresh(false);
            setGames(res.data.games);
        })
        .catch((err) => console.log(err.response));

        return () => mounted = false;
    }, [refresh, authContext, setGames]);

    
    return (
        <div className="container">
            <div className="d-flex flex-wrap m-3">
                <h3>Games List</h3>
                <button className="btn btn-info ml-auto" type="button" onClick={() => setRefresh(true)}>
                    <svg className="bi bi-arrow-clockwise" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3.17 6.706a5 5 0 017.103-3.16.5.5 0 10.454-.892A6 6 0 1013.455 5.5a.5.5 0 00-.91.417 5 5 0 11-9.375.789z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M8.147.146a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 11-.707-.708L10.293 3 8.147.854a.5.5 0 010-.708z" clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
            {games.map((game) => <GameItem key={game} game={game}/>)}
        </div>
    );
}