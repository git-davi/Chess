import React, { useEffect, useState } from 'react';

export default function PlayGame({ socket, game_uuid }) {

    const [chessboard, setChessboard] = useState(null); 
    useEffect(() => {
        // fetch the chessboard with axiosAW from server
    }, [chessboard]);

    useEffect(() => {
        socket.on(game_uuid, (chessboard) => {
            console.log(chessboard);
            setChessboard(chessboard)
        })
    }, [game_uuid, chessboard, socket]);


    function moveEvent() {
        let exampleChessboard = 'ciao';
        socket.emit('move', {
            game_uuid: game_uuid,
            chessboard: exampleChessboard
        });
        // here post the chessboard to 
        // server with axiosAW (for persistance)
        setChessboard(exampleChessboard);
    }

    return (
        <div className="container">
            <button type="button" className="btn btn-success" onClick={moveEvent}>Test move</button>
        </div>
    );
}