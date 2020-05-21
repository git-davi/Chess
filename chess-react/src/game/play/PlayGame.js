import React, { useEffect, useState } from 'react';
import { axiosAuthWrapper as axiosAW } from '../util/axiosAuthWrapper';

//import { AuthContext } from '../../App';

export default function PlayGame({ socket, game_uuid }) {

    const [chessboard, setChessboard] = useState(); 

    useEffect(() => {
        axiosAW({
            method: 'get',
            url: '/game/info/state/' + game_uuid
        })
        .then((res) => setChessboard(res.data.chessboard))
        .catch(() => console.log('failed to fetch game state'));
    }, [game_uuid]);


    useEffect(() => {
        socket.on(game_uuid, (chessboard) => {
            // print for testing
            console.log(chessboard);
            setChessboard(chessboard)
        })
    }, [game_uuid, chessboard, socket]);


    function moveEvent() {
        let exampleChessboard = new Date();
        socket.emit('move', {
            game_uuid: game_uuid,
            chessboard: exampleChessboard
        });

        setChessboard(exampleChessboard);
    }

    return (
        <div className="container">
            <button type="button" className="btn btn-success" onClick={moveEvent}>Test move</button>
        </div>
    );
}