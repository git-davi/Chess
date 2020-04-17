import React, { useContext, useEffect } from 'react';

import {AuthContext} from '../App';
import {UserContext} from './Game';
import {axiosAuthWrapper as axiosAW} from './util/axiosAuthWrapper';


export default function GamesList({ games, setGames }) {

    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);

    useEffect(() => {
        axiosAW({
            method: 'get',
            url: '/game/user/'+userContext.user.username+'/games',
        }, () => authContext.setAuth(false))
        .then((res) => setGames(res.data.games))
        .catch((err) => console.log(err));
    }, []);


    return (
        <div>
            <h3 className="text-white">Games List</h3>
            {games.map((game) => 
                <div key={game} className="alert alert-warning" role="alert">
                    Game : {game}
                </div>
            )}
        </div>
    );
}