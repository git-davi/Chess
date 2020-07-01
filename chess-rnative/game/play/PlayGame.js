import React, { useEffect, useState, useContext } from 'react';
import { axiosAuthWrapper as axiosAW } from '../util/axiosAuthWrapper';

import Chessboard from 'chessboardjsx';
//import WithMoveValidation from './WithMoveValidation'
import parseJwt from '../util/parseJwt';
import { View, Button, Text } from 'native-base';
import Board from './board/Board'

import ChessboardComp from './ChessboardComp';
import { AuthContext } from '../../App';


export default function PlayGame({ socket, game_uuid, white, black }) {

    const [chessboard, setChessboard] = useState();
    const [move, setMove] = useState();
    const [myTurn, setMyTurn] = useState();
    const [gameState, setGameState] = useState();

    //const username = useState(parseJwt(localStorage.getItem(TOKEN_KEY)).username)[0];
            //diventa 
    const authContext = useContext(AuthContext);
    const username = useState(parseJwt(authContext.auth).username)[0];

    var fenFunction = null;
    function setFenFunction(callback) {
        fenFunction = callback;
    }

    useEffect(() => {
        let mounted = true;

        axiosAW({
            method: 'get',
            url: '/game/info/state/' + game_uuid
        }, authContext)
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
            fenFunction(data.chessboard);
           /* console.log('message received!');
            console.log(data.chessboard);*/
            setChessboard(data.chessboard);
            setMove(data.move);
            setMyTurn(true);
            if (data.check)
                setGameState('Check');
            if (data.checkmate)
                setGameState('CheckMate');
            if (data.draw)
                setGameState('Draw');
        })

        return () => mounted = false;
    }, [game_uuid, socket, fenFunction]);


    function moveEvent(new_move,new_chessboard, isCheckmate, isCheck, isDraw) {

        socket.emit('move', {
            game_uuid: game_uuid,
            whosend: username,
            turn: username === white ? black : white,
            chessboard: new_chessboard,
            move: new_move,
            check: isCheck,
            checkmate: isCheckmate,
            draw: isDraw
        });
      //  console.log(new_move);
     //   console.log('check?'+ isCheck);
        //setMove(new_move);
        setChessboard(new_chessboard);
        setMyTurn(false);
    }

    var color;
    color= username === white ? 'white' : 'black';
   // console.log('i am player color : ' + color);
    /*
    console.log('----------------------------------------------');
    console.log('Is my turn : '+ myTurn);
    console.log('chessboard value : ' + chessboard);
    console.log('move value : ' ,  JSON.stringify(move));
    console.log('----------------------------------------------');
    */

    return (
        <View>
            <View>
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
                                setGameState={setGameState}
                                >
                    {({
                          position,
                          shouldSelectPiece,
                          onMove,
                          
                      }) => (
                        <Board
                            //id="humanVsHuman"
                            //calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
                            position={chessboard}
                            //fen={chessboard}
                            onMove={onMove}
                           // color={color}
                           // orientation={username === white? 'white' : 'black'}
                            shouldSelectPiece={shouldSelectPiece}
                            //onDragOverSquare={onDragOverSquare}
                        />
                    )}

                </ChessboardComp>
            </View>
            {gameState && (
                <View>
                    <Text>{gameState}</Text>
                </View>
            ) }

        </View>
    );
}