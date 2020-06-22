import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button } from 'native-base'

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';



export default function SearchGame({ games, setGames }) {


    const authContext = useContext(AuthContext);
    const [result, setResult] = useState({});

    const [searchState, setSearchState] = useState('idle');
    
    // for searching state
    useEffect(() => {
        let mounted = true;
        if (searchState === 'idle') return () => mounted = false;
        if (searchState === 'stop') return () => mounted = false;

        axiosAW({
            method: 'get',
            url: '/game/matchmaking/start',
        }, authContext)
        .then((res) => {
            if (!mounted) return;
            setSearchState('idle');
            setResult({status: 'success', message: 'Game found : '+res.data.name});
            setGames([...games, { game_uuid:res.data.game_uuid, name: res.data.name} ]);
        })
        .catch((err) => {
            if (!mounted) return;
            setSearchState('idle');
            setResult({status: 'failed', message: 'Failed to search game'});
        });

        return () => mounted = false;
    }, [searchState, authContext, games, setGames]);


    // for stopping state
    useEffect(() => {
        let mounted = true;
        if (searchState === 'idle') return () => mounted = false;
        if (searchState === 'start') return () => mounted = false;

        axiosAW({
            method: 'get',
            url: '/game/matchmaking/stop',
        }, authContext)
        .then((res) => {
            if (!mounted) return;
            setSearchState('idle');
            setResult({status: 'success', message: 'Matchmaking stopped with success'});
        })
        .catch((err) => {
            if (!mounted) return;
            setSearchState('idle'); // this will seem strange for the user but it's the only state
            setResult({status: 'failed', message: 'We couldn\'t stop matchmaking, you should search and stop again'});
        })

        return () => mounted = false;
    }, [searchState, authContext]);


    return (
        <View>
            <View>
                <View>
                    { searchState === 'start' &&
                    <Button danger onClick={() => setSearchState('stop')}>
                        <Text>Stop Search</Text>
                    </Button> }
                    { searchState === 'idle' &&
                    <Button success onClick={() => setSearchState('start')}>
                        <Text>Search a New Game</Text>
                    </Button> }
                    { searchState === 'stop' &&
                    <Button warning>
                        <Text>Stopping</Text>
                    </Button> }
                </View>
                { result.status === 'success' && <Text>{result.message}</Text> }
                { result.status === 'failed' && <Text>{result.message}</Text> }
            </View>
        </View>
    );
}