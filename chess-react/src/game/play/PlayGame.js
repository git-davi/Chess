import React, { useEffect, useState, useRef } from 'react';
import { axiosAuthWrapper as axiosAW } from '../util/axiosAuthWrapper';

import parseJwt from '../util/parseJwt';
//import { AuthContext } from '../../App';

import {TOKEN_KEY} from '../../storageKeys';


export default function PlayGame({ socket, game_uuid }) {
    
    const [chessboard, setChessboard] = useState();
    const [myTurn, setMyTurn] = useState();

    const username = useRef(parseJwt(localStorage.getItem(TOKEN_KEY)).username);


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
            // print for testing
            console.log(chessboard);
            setChessboard(chessboard);
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

    console.log('Is my turn : '+ myTurn);

    return (
        <div className="container">
            <button type="button" className="btn btn-success" onClick={moveEvent}>Test move</button>
        </div>
    );
}