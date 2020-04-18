import React, { useContext, useState, useEffect } from 'react';

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
            setResult({status: 'success', message: 'Game found :'+res.data.game_uuid});
            setGames([...games, res.data.game_uuid]);
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
        <div className="container">
            <div className="d-flex flex-wrap m-3 align-items-center">
                <div className="mr-auto">
                    { searchState === 'start' &&
                    <button className="btn btn-lg btn-danger" type="button" onClick={() => setSearchState('stop')}>
                        Stop Search
                        <svg className="bi bi-exclamation-octagon-fill ml-3" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"/>
                        </svg>
                    </button> }
                    { searchState === 'idle' &&
                    <button className="btn btn-lg btn-success" type="button" onClick={() => setSearchState('start')}>
                        Search a New Game
                        <svg className="bi bi-search ml-3" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"/>
                        </svg>
                    </button> }
                    { searchState === 'stop' &&
                    <button className="btn btn-lg btn-warning" type="button">
                        Stopping
                        <svg className="bi bi-clock" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clipRule="evenodd"/>
                        </svg>
                    </button> }
                </div>
                { result.status === 'success' && <div className="alert alert-success m-0" role="alert">{result.message}</div> }
                { result.status === 'failed' && <div className="alert alert-danger m-0" role="alert">{result.message}</div> }
            </div>
        </div>
    );
}