import React, { useContext, useEffect, useState } from 'react';

import GameItem from './GameItem';

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';

import { View, Text, Button } from 'native-base'

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
        <View>
            <View>
                <Text>Games List</Text>
                <Button onClick={() => setRefresh(true)}>
                    <Text>Refresh</Text>
                </Button>
            </View>
            {games.map((game) => <GameItem  key={game.game_uuid} 
                                            game={game.game_uuid} 
                                            name={game.name} 
                                            setRefresh={setRefresh}/>)}
        </View>
    );
}