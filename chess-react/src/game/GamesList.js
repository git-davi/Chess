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


    return (
        <div className="mt-4">
            <h3>Games List</h3>
            {games.map((game) => 
                <div key={game} className="alert alert-warning" role="alert">
                    Game : {game}
                </div>
            )}
        </div>
    );
}