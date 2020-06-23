import React, { useContext, useEffect, useState } from 'react';

import GameItem from './GameItem';

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';

import { View, Text, Button } from 'native-base'

export default function GamesList({games, setGames, refresh, setRefresh}) {

    const authContext = useContext(AuthContext);


    useEffect(() => {
        let mounted = true;
        axiosAW({
            method: 'get',
            url: '/game/games',
        }, authContext)
        .then((res) => {
            if(!mounted) return;
            setGames(res.data.games);
            setRefresh(false);
        })
        .catch((err) => console.log(err.response));

        return () => mounted = false;
    }, [authContext, setGames, refresh, setRefresh]);

    
    return (
        <View>
            <View>
                <Text>Games List</Text>
                <Button onPress={() => setRefresh(true)}>
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