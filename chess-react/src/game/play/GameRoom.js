import React, { useEffect, useContext, useState } from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';

import PlayGame from './PlayGame';

import { axiosAuthWrapper as axioAW } from '../util/axiosAuthWrapper';
import { AuthContext } from '../../App';
import { TOKEN_KEY } from '../../storageKeys';

import io from 'socket.io-client';

export default function GameRoom() {

    const authContext = useContext(AuthContext);
    const { game_uuid } = useParams();
    const [forbidden, setForbidden ] = useState(false);
    const [white, setWhite] = useState();
    const [black, setBlack] = useState();
    const socket = useState(io())[0];

    // on dismount disconnect socket
    useEffect(() => () => socket.disconnect(), [socket]);

    // connect to the game channel
    useEffect(() => {
        socket.emit('joinGameRoom', {
            game_uuid: game_uuid,
            token: localStorage.getItem(TOKEN_KEY)
        });
    }, [game_uuid, socket]);

    
    // on mount check if this is my game
    useEffect(() => {
        let mounted = true;

        axioAW({
            method: 'get',
            url: '/game/info/players/' + game_uuid
        }, authContext)
        .then((res) => {
            if (!mounted) return;
            setWhite(res.data.white);
            setBlack(res.data.black);
        })
        .catch((err) => {
            if (!mounted) return;
            if(err.response !== undefined && err.response.status === 403)
                setForbidden(true)
        })

        return () => mounted = false;
    }, [authContext, game_uuid]);


    return (
        ( forbidden ? 
        <Redirect to=""/> :
        <div className="container">
            <div className="card mt-3">
                <div className="d-flex m-3 align-items-center">
                    <div className="container">
                        <h3 className="">&#9812; <span className="badge badge-light">{white}</span></h3>
                        <h3 className="">&#9818; <span className="badge badge-dark">{black}</span></h3>
                    </div>
                    <Link className="ml-auto" to="/">
                        <button className="btn btn-secondary btn-md">
                            Home
                            <svg className="bi bi-house-fill" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clipRule="evenodd"/>
                                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z" clipRule="evenodd"/>
                            </svg>
                        </button>
                    </Link>
                </div>
                <PlayGame socket={socket} game_uuid={game_uuid} />
            </div>
        </div>)
    );
}