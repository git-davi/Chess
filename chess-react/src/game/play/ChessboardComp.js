import { Component } from 'react';
import PropTypes from 'prop-types';
import Chess from "chess.js";

//import WithMoveValidation from './WithMoveValidation'

let stringa;

export default class ChessboardComp extends Component {

    constructor(props){
        super(props);
        this.state = {
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
        }
        stringa=this.props.chessboard;
       /* if(this.props.chessboard == null){
            console.log('waiting timeout')
            setTimeout(this.waitAlert,4000);
        }*/
    }

    static propTypes = { children: PropTypes.func };

    /*state = {
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
    };*/

    componentDidMount() {
       /* if(this.props.chessboard == null){
            console.log('waiting timeout')
            setTimeout(this.waitAlert,4000);
        }*/
        stringa=this.props.chessboard;
        this.game = new Chess(this.props.chessboard);
        console.log('lo stato della chessboard è *******************************');
        console.log(stringa);
        //this.game.load(stringa)
        //fenFunction= () => console.log('it worked');
        //this.game.load(this.props.chessboard);
        //fenFunction=this.game.load;
        this.props.setFenFunction(this.game.load);
        console.log("component mounted!")
        //console.log(fenFunction);
      /*  this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));*/
    }

    componentDidUpdate() {
        if(this.game.fen() != this.props.chessboard){
            if(this.props.chessboard != null && this.game.fen() === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'){
                this.game.load(this.props.chessboard);
            }
        }
    }
    
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

        console.log('controllo lo stato della scacchiera')
        console.log(this.game.fen());

        if(this.game.in_checkmate()===true){
            checkmate=true;
            console.log('checkmate!!!!!');
        }

        if(this.game.in_check()===true){
            check=true;
            //this.game.load('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3')
            console.log('in checkkooooo!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        
        if(this.game.in_draw()===true){
            draw=true;
            console.log('draw game!!!!!');
        }    

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