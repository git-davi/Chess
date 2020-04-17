import React, { useContext, useState } from 'react';

import {AuthContext} from '../App';
import {axiosAuthWrapper as axiosAW} from './util/axiosAuthWrapper';


export default function SearchGame({ games, setGames }) {


    const authContext = useContext(AuthContext);
    const [result, setResult] = useState({});
    const [searchState, setSearchState] = useState(false);


    function startSearch() {
        setSearchState(true);
        axiosAW({
            method: 'get',
            url: '/game/matchmaking/start',
        }, authContext)
        .then((res) => {
            setResult({status: 'success', message: 'Game found :'+res.data.game_uuid});
            setSearchState(false);
            setGames([...games, res.data.game_uuid]);
        })
        .catch((err) => {
            console.log(err.response)
            setResult({status: 'failed', message: 'Failed to search game'});
            setSearchState(false);
        });
    }


    function stopSearch() {
        axiosAW({
            method: 'get',
            url: '/game/matchmaking/stop',
        }, authContext)
        .then((res) => {
            setResult({status: 'success', message: 'Matchmaking stopped with success'});
            setSearchState(false);
        })
        .catch((err) => setResult({status: 'failed', message: 'We couldn\'t stop matchmaking'}))
    }


    return (
        <div className="container d-flex m-2">
            <div className="mr-auto">
                { searchState ?
                    <button className="btn btn-lg btn-danger" type="button" onClick={() => stopSearch()}>
                        Stop Search
                        <svg class="bi bi-exclamation-octagon-fill ml-3" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                    :
                    <button className="btn btn-lg btn-success" type="button" onClick={() => startSearch()}>
                        Search a New Game
                        <svg class="bi bi-search ml-3" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                }
            </div>
            <div className="">
                { result.status === 'success' && !searchState && <div className="alert alert-success" role="alert">{result.message}</div> }
                { result.status === 'failed' && !searchState && <div className="alert alert-danger" role="alert">{result.message}</div> }
            </div>
        </div>
    );
}