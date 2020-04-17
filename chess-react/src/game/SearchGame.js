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
        <div className="d-flex m-2 align-items-start">
            <div className="mr-auto">
                { searchState ?
                    <button className="btn btn-danger" type="button" onClick={() => stopSearch()}>
                        Stop Search &times;
                    </button>
                    :
                    <button className="btn btn-success" type="button" onClick={() => startSearch()}>
                        Search a New Game &hearts;
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