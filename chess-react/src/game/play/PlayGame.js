import React, { Component, useEffect, useState } from 'react';
import { axiosAuthWrapper as axiosAW } from '../util/axiosAuthWrapper';
import PropTypes from 'prop-types';
import Chess from "chess.js";

import Chessboard from 'chessboardjsx';
//import WithMoveValidation from './WithMoveValidation'
import parseJwt from '../util/parseJwt';
import {TOKEN_KEY} from '../../storageKeys';

var fenFunction= null;


class ChessboardComp extends Component {


    static propTypes = { children: PropTypes.func };

    state = {
        fen: this.props.chessboard,
        // square styles for active drop squares
        dropSquareStyle: {},
        // custom square styles
        squareStyles: {},
        // square with the currently clicked piece
        pieceSquare: '',
        // currently clicked square
        square: '',
        history: []
    };

    componentDidMount() {
        this.game = new Chess(this.props.chessboard);
        console.log('lo stato della chessboard è *******************************');
        console.log(this.props.chessboard);
        //fenFunction= () => console.log('it worked');
        //this.game.load(this.props.chessboard);
        fenFunction=this.game.load;
        console.log("component mounted!")
        console.log(fenFunction);
      /*  this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));*/
    }

   /* componentDidUpdate() {
        if(this.game.fen() != this.props.chessboard){
            this.setState(({ history, pieceSquare }) => ({
                fen: this.game.fen(),
                history: this.game.history({ verbose: true }),
                squareStyles: squareStyling({ pieceSquare, history })
            }));
            this.game.load(this.props.chessboard);
        }
    }*/

    allowDrag = ({sourceSquare, pieceSquare}) => {
        // do not pick up pieces if the game is over
        // or if it's not that side's turn
        //console.log("sono entrato");
        console.log(this.props.myTurn);
       /* if((this.game.turn() === 'w' && pieceSquare.search(/^b/) !== -1) ||
           (this.game.turn() === 'b' && pieceSquare.search(/^w/) !== -1))
           return false;*/
        if (this.props.myTurn === false) {
            return false;
        }
        else return true;
    };
    // keep clicked square style and remove hint squares
    removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
            squareStyles: squareStyling({ pieceSquare, history })
        }));
    };

    // show possible moves
    highlightSquare = (sourceSquare, squaresToHighlight) => {
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
                        history: this.state.history,
                        pieceSquare: this.state.pieceSquare
                    })
                };
            },
            {}
        );

        this.setState(({ squareStyles }) => ({
            squareStyles: { ...squareStyles, ...highlightStyles }
        }));
    };

    onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
       /* console.log('turn as i am dropping');
        console.log(this.game.turn());*/
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // always promote to a queen for example simplicity
        });
       // console.log(move);

        // illegal move
        if (move === null) return;

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));

        let checkmate=false;
        let check=false;
        let draw=false;

        if(this.game.in_checkmate())
            checkmate=true;

        if(this.game.in_check()===true){
            check=true;
            console.log('in checkkkkk!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        
        if(this.game.in_draw())
            draw=true;

        //socket manda la mossa
       /* console.log('turn after i dropped')
        console.log(this.game.turn());*/

        this.props.moveEvent(move, this.game.fen(),checkmate, check, draw);
    };

    onMouseOverSquare = square => {
        // get list of possible moves for this square
        let moves = this.game.moves({
            square: square,
            verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        this.highlightSquare(square, squaresToHighlight);
    };

    onMouseOutSquare = square => this.removeHighlightSquare(square);

    onSquareClick = square => {
        this.setState(({ history }) => ({
            squareStyles: squareStyling({ pieceSquare: square, history }),
            pieceSquare: square
        }));
        let move = this.game.move({
            from: this.state.pieceSquare,
            to: square,
            promotion: 'q' // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;

        this.props.moveEvent(move, this.game.fen());

        this.setState({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            pieceSquare: ''
        });
    };

    onSquareRightClick = square => {
        this.setState({
            squareStyles: { [square]: { backgroundColor: 'deepPink' } }
        });
        this.game.load(this.props.chessboard);
        console.log('turn of the player ');
        console.log(this.game.turn());
        console.log('chessboard position :: ');
        console.log(this.game.fen())
    }


    render() {
        const { fen, dropSquareStyle, squareStyles } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            onListen : this.onListen,
            allowDrag: this.allowDrag,
            onMouseOverSquare: this.onMouseOverSquare,
            onMouseOutSquare: this.onMouseOutSquare,
            onDrop: this.onDrop,
            dropSquareStyle,
            //onDragOverSquare: this.onDragOverSquare,
            onSquareClick: this.onSquareClick,
            onSquareRightClick: this.onSquareRightClick
        });
    }
}

const squareStyling = ({ pieceSquare, history }) => {
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


export default function PlayGame({ socket, game_uuid, white, black }) {

    const [chessboard, setChessboard] = useState();
    const [move, setMove] = useState();
    const [myTurn, setMyTurn] = useState();
    const [check, setCheck] = useState();
    const [checkmate, setCheckmate] = useState();
    const [draw, setDraw] = useState();
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
    }, [game_uuid, socket]);


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
            <button type="button" className="btn btn-success" onClick={ myTurn ? moveEvent : null }>Test move</button>
            <div>
                <ChessboardComp socket={socket} game_uuid={game_uuid} moveEvent={moveEvent} myTurn={myTurn} white={white} black={black} move={move} chessboard={chessboard} color={color}>
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