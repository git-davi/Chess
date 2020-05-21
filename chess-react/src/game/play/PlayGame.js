import React, { useEffect, useState } from 'react';
import { axiosAuthWrapper as axiosAW } from '../util/axiosAuthWrapper';

import parseJwt from '../util/parseJwt';
import {TOKEN_KEY} from '../../storageKeys';


export default function PlayGame({ socket, game_uuid }) {
    
    const [chessboard, setChessboard] = useState();
    const [myTurn, setMyTurn] = useState();
    const username = useState(parseJwt(localStorage.getItem(TOKEN_KEY)).username)[0];


    useEffect(() => {
        axiosAW({
            method: 'get',
            url: '/game/info/state/' + game_uuid
        })
        .then((res) => {
            setChessboard(res.data.chessboard)
            setMyTurn(res.data.turn === username);
        })
        .catch(() => console.log('failed to fetch game state'));
    }, [game_uuid, username]);


    useEffect(() => {
        socket.on(game_uuid, (chessboard) => {
            setChessboard(chessboard);
            setMyTurn(true);
        })
    }, [game_uuid, chessboard, socket]);


    function moveEvent() {
        let exampleChessboard = new Date();
        socket.emit('move', {
            game_uuid: game_uuid,
            chessboard: exampleChessboard
        });

        setChessboard(exampleChessboard);
        setMyTurn(false);
    }

    console.log('----------------------------------------------');
    console.log('Is my turn : '+ myTurn);
    console.log('chessboard value : ' + chessboard);
    console.log('----------------------------------------------');


    return (
        <div className="container">
            <button type="button" className="btn btn-success" onClick={moveEvent}>Test move</button>
        </div>
    );
}