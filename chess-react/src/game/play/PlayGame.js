import React, { useEffect, useState } from 'react';
import { axiosAuthWrapper as axiosAW } from '../util/axiosAuthWrapper';

import Chessboard from 'chessboardjsx';
//import WithMoveValidation from './WithMoveValidation'
import parseJwt from '../util/parseJwt';
import {TOKEN_KEY} from '../../storageKeys';

import ChessboardComp from './ChessboardComp';


export default function PlayGame({ socket, game_uuid, white, black }) {

    const [chessboard, setChessboard] = useState();
    const [move, setMove] = useState();
    const [myTurn, setMyTurn] = useState();
    const [check, setCheck] = useState();
    const [checkmate, setCheckmate] = useState();
    const [draw, setDraw] = useState();
    const username = useState(parseJwt(localStorage.getItem(TOKEN_KEY)).username)[0];

    //const [fenFunction, setFenFunction] = useState();
    var fenFunction = null;
    function setFenFunction(callback) {
        fenFunction = callback;
    }

    useEffect(() => {
        let mounted = true;

        axiosAW({
            method: 'get',
            url: '/game/info/state/' + game_uuid
        })
            .then((res) => {
                if (!mounted) return;
                setChessboard(res.data.chessboard)
                setMyTurn(res.data.turn === username);
            })
            .catch(() => console.log('failed to fetch game state'));

        return () => mounted = false;
    }, [game_uuid, username]);


    useEffect(() => {
        let mounted = true;

        socket.on(game_uuid, (data) => {
            if (!mounted) return;
            console.log('socket.on activated');
            fenFunction(data.chessboard);
            setChessboard(data.chessboard);
            setMove(data.move);
            setMyTurn(true);
            setCheck(data.check);
            setCheckmate(data.checkmate);
            setDraw(data.draw);
            console.log('am i in check?');
            console.log(check);
        })

        return () => mounted = false;
    }, [game_uuid, socket, fenFunction, check]);


    function moveEvent(new_move,new_chessboard, isCheckmate, isCheck, isDraw) {

        socket.emit('move', {
            game_uuid: game_uuid,
            turn: username === white ? black : white,
            chessboard: new_chessboard,
            move: new_move,
            check: isCheck,
            checkmate: isCheckmate,
            draw: isDraw
        });
        console.log(new_move);
        console.log('check?'+ isCheck);
        //setMove(new_move);
        setChessboard(new_chessboard);
        setMyTurn(false);
    }

    var color;
    color= username === white ? 'white' : 'black';
   // console.log('i am player color : ' + color);
  /*  console.log('----------------------------------------------');
    console.log('Is my turn : '+ myTurn);
    console.log('chessboard value : ' + chessboard);
    console.log('move value : ' ,  JSON.stringify(move));
    console.log('----------------------------------------------');
*/


    return (
        <div className="container">
            <div className="row justify-content-center">
                <ChessboardComp className="col"
                                socket={socket} 
                                game_uuid={game_uuid} 
                                moveEvent={moveEvent} 
                                myTurn={myTurn} 
                                white={white} 
                                black={black} 
                                move={move} 
                                chessboard={chessboard} 
                                color={color}
                                setFenFunction={setFenFunction}
                                >
                    {({
                          position,
                          onDrop,
                          allowDrag,
                          onListen,
                          onMouseOverSquare,
                          onMouseOutSquare,
                          squareStyles,
                          dropSquareStyle,
                          // onDragOverSquare,
                          onSquareClick,
                          onSquareRightClick
                      }) => (
                        <Chessboard
                            id="humanVsHuman"
                            calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
                            position={chessboard}
                            onDrop={onDrop}
                            orientation={username === white? 'white' : 'black'}
                            onMouseOverSquare={onMouseOverSquare}
                            onMouseOutSquare={onMouseOutSquare}
                            boardStyle={{
                                borderRadius: '5px',
                                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                            }}
                            squareStyles={squareStyles}
                            dropSquareStyle={dropSquareStyle}
                            allowDrag={allowDrag}
                            //onDragOverSquare={onDragOverSquare}
                            onSquareClick={onSquareClick}
                            onSquareRightClick={onSquareRightClick}
                        />
                    )}
                </ChessboardComp>
            </div>
        </div>
    );
}