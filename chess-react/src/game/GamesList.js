import React, { useContext, useEffect } from 'react';

import {AuthContext} from '../App';
import {axiosAuthWrapper as axiosAW} from './util/axiosAuthWrapper';


export default function GamesList({games, setGames}) {

    const authContext = useContext(AuthContext);

    useEffect(() => {
        axiosAW({
            method: 'get',
            url: '/game/games',
        }, authContext)
        .then((res) => setGames(res.data.games))
        .catch((err) => console.log(err.response));
    }, [authContext, setGames]);


    function refreshGames() {
        axiosAW({
            method: 'get',
            url: '/game/games',
        }, authContext)
        .then((res) => setGames(res.data.games))
        .catch((err) => console.log(err.response));
    }


    return (
        <div className="mt-2">
            <div className="row m-3">
                <h3>Games List &#9822;</h3>
                <button className="btn btn-info ml-auto" type="button" onClick={refreshGames}>&#8635;</button>
            </div>
            {games.map((game) => 
                <div key={game} className="alert alert-warning" role="alert">
                    Game : {game}
                </div>
            )}
        </div>
    );
}