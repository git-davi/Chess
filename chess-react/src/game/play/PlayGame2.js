import React, { Component, useEffect, useState } from 'react';
import { axiosAuthWrapper as axiosAW } from '../util/axiosAuthWrapper';
import PropTypes from 'prop-types';
import Chess from "chess.js";

import Chessboard from 'chessboardjsx';
//import WithMoveValidation from './WithMoveValidation'
import parseJwt from '../util/parseJwt';
import {TOKEN_KEY} from '../../storageKeys';


function ChessboardComp ({socket, game_uuid, moveEvent, myTurn, white,black,move,chessboard}){

    let game;
    //static propTypes = { children: PropTypes.func };
    const [fen,setFen] = useState('start');
    // const [dropsquareStyle,setDropSquareStyle] = useState();
    //const [squareStyles,setSquareStyles] = useState();
    const [pieceSquare,setPieceSquare]= useState();
    const [square,setSquare] = useState();
    const [history,setHistory] = useState();

    /*state = {
      fen: 'start',
      // square styles for active drop squares
      dropSquareStyle: {},
      // custom square styles
      squareStyles: {},
      // square with the currently clicked piece
      pieceSquare: '',
      // currently clicked square
      square: '',
      history: []
    };*/
    /*
      componentDidMount() {
        this.game = new Chess();
      }
    */
    useEffect(() =>{
        game= new Chess();
    },[]);

    const allowDrag = ({sourceSquare, pieceSquare}) => {
        // do not pick up pieces if the game is over
        // or if it's not that side's turn
        //console.log("sono entrato");
        console.log(myTurn);
        if (myTurn === false) {
            return false;
        }
        else return true;
    };
    // keep clicked square style and remove hint squares
  /*  const removeHighlightSquare = () => {/*
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
        let tmp=squareStyling({ pieceSquare, history })
        setSquareStyles(tmp);
    };*/
/*
    // show possible moves
    const highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background:
                                'radial-gradient(circle, #fffc00 36%, transparent 40%)',
                            borderRadius: '50%'
                        }
                    },
                    ...squareStyling({
                        history: history,
                        pieceSquare: pieceSquare
                    })
                };
            },
            {}
        );
        /*
            this.setState(({ squareStyles }) => ({
              squareStyles: { ...squareStyles, ...highlightStyles }
            }));


    };*/

    //setSquareStyles((...squareStyles, ...highlightStyles));
    const onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // always promote to a queen for example simplicity
        });
        console.log(move);

        // illegal move
        if (move === null) return;/*
    this.setState(({ history, pieceSquare }) => ({
      fen: game.fen(),
      history: game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history })
    }));*/
        setFen(game.fen());
        setHistory(game.history({verbose : true}));
      /*  let tmp1=squareStyling({ pieceSquare, history})
        setSquareStyles(tmp1);*/
        //socket manda la mossa

        moveEvent(move, game.fen());
    };

  /*  const onMouseOverSquare = (square) => {
        // get list of possible moves for this square
        let moves = game.moves({
            square: square,
            verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        highlightSquare(square, squaresToHighlight);
    };

    const onMouseOutSquare = (square) => removeHighlightSquare(square);
*/
    /*const onSquareClick = square => {
      this.setState(({ history }) => ({
        squareStyles: squareStyling({ pieceSquare: square, history }),
        pieceSquare: square
      }));
      let move = game.move({
        from: pieceSquare,
        to: square,
        promotion: 'q' // always promote to a queen for example simplicity
      });

      // illegal move
      if (move === null) return;

      this.setState({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        pieceSquare: ''
      });
    };*/
    /*
      onSquareRightClick = square =>
        this.setState({
          squareStyles: { [square]: { backgroundColor: 'deepPink' } }
        });
    */
    //const { fen, dropSquareStyle, squareStyles } = this.state;

    return props.children({
        //squareStyles,
        position: fen,
        //onListen : this.onListen,
        allowDrag: allowDrag,
       // onMouseOverSquare: onMouseOverSquare,
        //onMouseOutSquare: onMouseOutSquare,
        onDrop: onDrop,
        //dropSquareStyle,
        //onDragOverSquare: this.onDragOverSquare,
        //onSquareClick: onSquareClick,
        //onSquareRightClick: onSquareRightClick
    });

}

/*const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
        [pieceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        ...(history.length && {
            [sourceSquare]: {
                backgroundColor: 'rgba(255, 255, 0, 0.4)'
            }
        }),
        ...(history.length && {
            [targetSquare]: {
                backgroundColor: 'rgba(255, 255, 0, 0.4)'
            }
        })
    };
};
*/

export default function PlayGame({ socket, game_uuid, white, black }) {

    const [chessboard, setChessboard] = useState();
    const [move, setMove] = useState();
    const [myTurn, setMyTurn] = useState();
    const username = useState(parseJwt(localStorage.getItem(TOKEN_KEY)).username)[0];


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
            setChessboard(data.chessboard);
            setMove(data.move);
            setMyTurn(true);
        })

        return () => mounted = false;
    }, [game_uuid, socket]);


    function moveEvent(new_move,new_chessboard) {
        //let exampleChessboard = String(new Date());
        // let exampleMove = String(new Date());
        socket.emit('move', {
            game_uuid: game_uuid,
            turn: username === white ? black : white,
            chessboard: new_chessboard,
            move: new_move,
        });
        console.log(new_move);
        //setMove(new_move);
        setChessboard(new_chessboard);
        setMyTurn(false);
    }

    console.log('----------------------------------------------');
    console.log('Is my turn : '+ myTurn);
    console.log('chessboard value : ' + chessboard);
    console.log('move value : ' ,  JSON.stringify(move));
    console.log('----------------------------------------------');



    return (
        <div className="container">
            <button type="button" className="btn btn-success" onClick={ myTurn ? moveEvent : null }>Test move</button>
            <div>
                <ChessboardComp socket={socket} game_uuid={game_uuid} moveEvent={moveEvent} myTurn={myTurn} white={white} black={black} move={move} chessboard={chessboard}>
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
                            position={position}
                            onDrop={onDrop}
                            //mettere l'orientazione a seconda dello stato del tipo
                            //orientation='black'
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