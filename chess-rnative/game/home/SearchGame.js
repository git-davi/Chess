import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Container, Card, Icon } from 'native-base'

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';
import { StyleSheet } from 'react-native';


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
        <View style={styles.marginAll}>
                <View style={styles.margin}>
                    { searchState === 'start' &&
                    <Button iconLeft style ={styles.button}  danger onPress={() => setSearchState('stop')}>
                        <Icon name={"ios-warning"}></Icon>
                        <Text style={styles.Info}>Stop Search</Text>
                    </Button> }
                    { searchState === 'idle' &&
                    <Button iconLeft style ={styles.button} success onPress={() => setSearchState('start')}>
                        <Icon name={"ios-search"}></Icon>
                        <Text style={styles.Info }>Search a New Game </Text>
                    </Button> }
                    { searchState === 'stop' &&
                    <Button iconLeft style ={styles.button} warning>
                        <Icon name={'ios-pause'}></Icon>
                        <Text style={styles.Info}>Stopping</Text>
                    </Button> }
                </View>
                { result.status === 'success' && <Text style={styles.statusGood}>{result.message}</Text> }
                { result.status === 'failed' && <Text style={styles.statusBad}>{result.message}</Text> }
        </View>
    );
}

const styles = StyleSheet.create({
    Info: {
        color: 'white',
        textAlign: 'center',
        flex: 1
    },

    statusGood: {
        color: 'green',
        fontStyle: 'italic',
        textAlign: 'center',
        flex: 1
    },

    statusBad: {
        color: 'red',
        fontStyle: 'italic',
        textAlign: 'center',
        flex: 1
    }, 

    button: {
    marginLeft:"2%",
    width:'70%',
    },
    margin:{
        marginVertical:'4%'
    },

    marginAll: {
        marginBottom: '2%'
    }
  });